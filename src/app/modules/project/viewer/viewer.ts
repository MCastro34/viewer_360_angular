import { httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Marzipano } from '../../../services/viewer/marzipano';
import gsap from 'gsap';
import { Video } from '../../../services/viewer/video';
import { Header } from './header/header';

const CROSSFADE_DURATION = 0.5;

@Component({
  selector: 'app-viewer',
  imports: [RouterModule, Header],
  templateUrl: './viewer.html',
  styleUrl: './viewer.css',
})
export class Viewer implements OnDestroy {
  private _marzipano = inject(Marzipano);
  private _video = inject(Video);

  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private childData = toSignal(this.route.firstChild?.data || this.route.data);
  project = computed(() => this.data()?.project as Project);
  configs = httpResource<ProjectConfigs>(() => this.project().configRef);
  private sceneURL = computed(() => this.childData()?.sceneRef as string);
  scene = httpResource<Scene>(() => this.sceneURL());

  pano = viewChild<ElementRef<HTMLDivElement>>('pano');
  video = viewChild<ElementRef<HTMLDivElement>>('video');

  constructor() {
    this.toggleViewers(false, false);
    effect(() => {
      if (this.scene.hasValue()) {
        const scene = this.scene.value();
        switch (scene.type) {
          case 'panorama':
            const pano = this.pano()?.nativeElement;
            if (pano) {
              this._marzipano.init(pano);
              this._marzipano.loadScene(scene.data as Data360);
              this._marzipano.changeScene();
              this.toggleViewers(true, false);
            }
            break;
          case 'video':
            const video = this.video()?.nativeElement;
            if (video) {
              this._video.init(video);
              this._video.load(scene.data.url);
            }
            this.toggleViewers(false, true);
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._marzipano.destroy();
    this._video.destroy();
  }

  toggleViewers(panoB: boolean, videoB: boolean) {
    const pano = this.pano()?.nativeElement;
    const video = this.video()?.nativeElement;
    if (pano) {
      gsap
        .to(pano, {
          opacity: panoB ? 1 : 0,
          pointerEvents: panoB ? 'auto' : 'none',
          onComplete: () => {
            if (!panoB) {
              this._marzipano.destroy();
            }
          },
        })
        .duration(CROSSFADE_DURATION);
    }
    if (video) {
      gsap
        .to(video, {
          opacity: videoB ? 1 : 0,
          pointerEvents: videoB ? 'auto' : 'none',
          onComplete: () => {
            if (!videoB) {
              this._video.stop();
            } else {
              this._video.play();
            }
          },
        })
        .duration(CROSSFADE_DURATION);
    }
  }
}

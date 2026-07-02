import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-mobile',
  imports: [RouterLink],
  templateUrl: './mobile.html',
  styleUrl: './mobile.css',
})
export class Mobile {
  route = inject(ActivatedRoute);
  scenes = input<string[]>([]);

  scene = toSignal(this.route.firstChild!.paramMap.pipe(map((params) => params.get('scene')!)));
  nextScene = computed(() => {
    const currentScene = this.scene();
    const currentIndex = this.sceneIndex(currentScene || '');
    const nextIndex = (currentIndex + 1) % this.scenes().length;
    return this.scenes()[nextIndex];
  });
  prevScene = computed(() => {
    const currentScene = this.scene();
    const currentIndex = this.sceneIndex(currentScene || '');
    const prevIndex = (currentIndex - 1 + this.scenes().length) % this.scenes().length;
    return this.scenes()[prevIndex];
  });
  currentSceneIndex = computed(() => {
    const currentScene = this.scene();
    return this.sceneIndex(currentScene || '');
  });

  sceneIndex(scene: string): number {
    return this.scenes().indexOf(scene);
  }
}

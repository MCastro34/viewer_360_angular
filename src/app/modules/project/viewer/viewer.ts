import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewer',
  imports: [RouterModule],
  templateUrl: './viewer.html',
  styleUrl: './viewer.css',
})
export class Viewer {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private childData = toSignal(this.route.firstChild?.data || this.route.data);
  project = computed(() => this.data()?.project as Project);
  configs = httpResource<ProjectConfigs>(() => this.project().configRef);
  scene = computed(() => this.childData()?.sceneRef as string);

  constructor() {
    console.log('VIEWER CONSTRUCTOR');
    effect(() => {
      console.log(this.scene());
    });
  }
}

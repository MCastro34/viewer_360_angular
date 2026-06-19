import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Default } from './templates/default/default';
import { Extended } from './templates/extended/extended';

@Component({
  selector: 'app-landing-page',
  imports: [Default, Extended],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  project = computed(() => this.data()?.project as Project);
  configs = httpResource<ProjectConfigs>(() => this.project().configRef);

  constructor() {}
}

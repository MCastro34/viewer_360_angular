import { inject, Service } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Service()
export class Webtitle {
  private title = inject(Title);

  constructor() {
    this.title.setTitle(environment.webtitle || this.title.getTitle());
  }

  toString(suffix?: string) {
    let t = this.title.getTitle();
    if (suffix) {
      t = `${t.trim()} | ${suffix.trim()}`;
    }
    return t;
  }
}

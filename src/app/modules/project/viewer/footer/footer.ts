import { Component, input } from '@angular/core';
import { Mobile } from './mobile/mobile';
import { Desktop } from './desktop/desktop';

@Component({
  selector: 'app-footer',
  imports: [Mobile, Desktop],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  scenes = input<string[]>([]);
}

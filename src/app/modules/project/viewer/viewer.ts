import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewer',
  imports: [RouterModule],
  templateUrl: './viewer.html',
  styleUrl: './viewer.css',
})
export class Viewer {
  constructor() {
    console.log('VIEWER CONSTRUCTOR');
  }
}

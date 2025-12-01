import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root-component',
  templateUrl: './root-component.html',
  styleUrl: './root-component.css',
  imports: [
    RouterOutlet
  ]
})
export class RootComponent {

}

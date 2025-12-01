import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  constructor ( private authService : AuthService ) { 
  }

  protected logout () {
    this . authService . logout () ;
  }


}

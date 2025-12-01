import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home-component/home-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { TipoComponent } from './tipo-component/tipo-component';
import { ObraComponent } from './obra-component/obra-component';
import { ReviewComponent } from './review-component/review-component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TipoComponent,
    ObraComponent,
    ReviewComponent,
    DashboardComponent
  ]
})
export class HomeModule {}

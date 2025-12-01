import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing-module';
import { RootComponent } from './root-component/root-component';
import { LoginComponent } from './login-component/login-component';


@NgModule({
  imports: [
    RootComponent,
    CommonModule,
    RootRoutingModule,
    LoginComponent
  ]
})
export class RootModule { }

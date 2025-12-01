import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { UsuarioComponent } from './usuario-component/usuario-component';
import { homeGuard } from '../../core/security/home-guard';
import {ObraComponent} from './obra-component/obra-component';
import {TipoComponent} from './tipo-component/tipo-component';
import {ReviewComponent} from './review-component/review-component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [homeGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'tipos', component: TipoComponent },
      { path: 'obras', component: ObraComponent },
      { path: 'reviews', component: ReviewComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthComponent } from './oauth.component';

const routes: Routes = [
  {
    path: 'access/oauth',
    component: OauthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class OauthRoutingModule { }

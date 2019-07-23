import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthComponent } from './oauth.component';
import { OauthRoutingModule } from './oauth-routing.module';

@NgModule({
  declarations: [OauthComponent],
  imports: [
    CommonModule,
    OauthRoutingModule
  ]
})
export class OauthModule { }

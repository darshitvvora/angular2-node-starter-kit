import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from '../shared/angular-material.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
    RouterModule,
  ],
  exports: [
    NavigationBarComponent,
    NavComponent,
    SidenavComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    AuthGuard,
  ],
})

export class CoreModule { }

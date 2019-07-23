import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'template',
    loadChildren: './template/template.module#TemplateModule'
  },
  {
    path: '**',
    redirectTo: '/template/list/me',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

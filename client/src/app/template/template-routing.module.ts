import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [{
      path: 'list/:type', component: ListComponent,
    },{
      path: 'new', component: NewComponent,
    }, {
      path: ':id', component: NewComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TemplateRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { TemplateRoutingModule } from './template-routing.module';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DynamicVariableModule } from '../shared/components/dynamic-varibale/dynamic-variable.module';
import { CoreModule } from '../core/core.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [
    TemplateComponent,
    ListComponent,
    NewComponent,
  ],
  imports: [
    CommonModule,
    QuillModule,
    SharedModule,
    CoreModule,
    DynamicVariableModule,
    ReactiveFormsModule,
    TemplateRoutingModule,
  ]
})
export class TemplateModule { }

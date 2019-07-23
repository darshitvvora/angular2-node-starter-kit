import { NgModule } from '@angular/core';
import { DynamicVariableDialogComponent } from './dynamic-variable-dialog.component';
import {SharedModule} from '../../../shared.module';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    DynamicVariableDialogComponent,
  ],
  entryComponents: [
    DynamicVariableDialogComponent,
  ],
})

export class DynamicVariableDialogModule { }

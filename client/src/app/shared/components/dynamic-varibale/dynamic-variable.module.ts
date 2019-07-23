import { NgModule } from '@angular/core';
import {DynamicVariableComponent} from './dynamic-variable.component';
import {DynamicVariableDialogModule} from './dynamic-varibale-dialog/dynamic-variable-dialog.module';
import {SharedModule} from '../../shared.module';


@NgModule({
  imports: [
    SharedModule,
    DynamicVariableDialogModule,
  ],
  exports: [
    DynamicVariableComponent,
  ],
  declarations: [
    DynamicVariableComponent,
  ],
})

export class DynamicVariableModule { }

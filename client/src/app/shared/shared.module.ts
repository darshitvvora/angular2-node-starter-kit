import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
  ],
  declarations: [

  ],
})

export class SharedModule { }

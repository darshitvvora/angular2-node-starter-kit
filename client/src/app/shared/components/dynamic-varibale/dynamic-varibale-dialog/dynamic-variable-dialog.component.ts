import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

class ModalComponentModel {
}

@Component({
  selector: 'app-dynamic-variable-dialog',
  templateUrl: './dynamic-variable-dialog.component.html',
  styleUrls: ['./dynamic-variable-dialog.component.scss']
})

export class DynamicVariableDialogComponent implements OnInit {

  dialogData: any;
  variableName: string;
  showNewInputField = false;

  constructor(
    private dialogRef: MatDialogRef<DynamicVariableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dialogData = this.data;

    const rightMostPos = window.innerWidth - Number(this.dialogData.left);
    this.dialogRef.updatePosition({ top: `${this.dialogData.top}px`,
      right: `${rightMostPos}px`});
  }

  addVariable() {
    console.log(this.variableName);
    this.dialogRef.close(this.variableName);
  }

  toggleNew() {
    this.showNewInputField = !this.showNewInputField;
    console.log(this.showNewInputField);
  }

  selectVariable() {

  }
}

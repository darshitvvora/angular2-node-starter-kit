import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import { DynamicVariableDialogComponent } from './dynamic-varibale-dialog/dynamic-variable-dialog.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dynamic-variable',
  templateUrl: './dynamic-variable.component.html',
  styleUrls: ['./dynamic-variable.component.scss']
})

export class DynamicVariableComponent implements OnInit {

  @ViewChild('dynamicvariable') dynamicvariable: ElementRef;
  @Output() addDynamicVariable = new EventEmitter();

  variables: Array<object>;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
  ) {
    this.addDynamicVariable.emit();
  }

  ngOnInit() {
    this.variables = [{
      id: 1,
      name: 'variable one',
    }, {
      id: 2,
      name: 'variable one',
    }];
  }

  formatVariable(variable: string): string {
    const formattedVariable = variable
      .trim()
      .split(/\s/)
      .join('_');

    return `{{${formattedVariable}}}`;
  }

  saveVariable(variable: string) {
    const formattedVariable = this.formatVariable(variable);

    this.http.post('http://www.mocky.io/v2/5d15e4160e00000b41a115cb', { data: formattedVariable })
      .subscribe(res => {
        this.addDynamicVariable.emit(formattedVariable);
      }, (err) => {
        console.log('failed to create dynamic variable');
      });
  }

  openDialog() {
    this.addDynamicVariable.emit('logPosition');
    const data = {
      top : this.dynamicvariable.nativeElement.getBoundingClientRect().top,
      left : this.dynamicvariable.nativeElement.getBoundingClientRect().left,
      variables: this.variables,
    };

    const dialogRef = this.dialog.open(DynamicVariableDialogComponent, {
      // width: '250px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveVariable(result);
      }
    });
  }
}

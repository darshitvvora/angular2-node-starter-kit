import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import handlebars from 'handlebars/dist/handlebars.js';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})

export class TemplateComponent implements OnInit {
  @ViewChild('quillref') quillref: ElementRef;

  editorForm: FormGroup;
  header: any;
  quillInstance: any;
  cursorPosition: number;

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null, Validators.required),
    });
  }

  storeCursorPosition() {
    if (this.quillInstance) {
      const range: any = this.quillInstance.getSelection();
      if (range && !range.length) {
        this.cursorPosition = range.index;
      }

      console.log(this.cursorPosition);
    }
  }

  submit() {
    console.log(this.editorForm.get('editor').value);
  }

  addVariableInTemplate(variable) {
    if (variable === 'logPosition') {
      return this.storeCursorPosition();
    }

    if (this.quillInstance) {
      this.quillInstance.insertText(this.cursorPosition, variable, 'normal', 'user');

      this.editorForm.controls['editor'].setValue(this.quillInstance.root.innerHTML);
    }
  }

  editorCreated($event) {
    this.quillInstance = $event;
  }
}

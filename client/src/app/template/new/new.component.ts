import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  @ViewChild('quillref') quillref: ElementRef;
  isNew: boolean;

  editorForm: FormGroup;
  quillInstance: any;
  cursorPosition: number;

  constructor(
    private route: ActivatedRoute
  ) {
    this.isNew = !!this.route.snapshot.paramMap.get('id');
  }

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

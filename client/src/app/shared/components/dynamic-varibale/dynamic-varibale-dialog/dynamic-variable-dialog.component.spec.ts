import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVariableDialogComponent } from './dynamic-variable-dialog.component';

describe('DynamicVariableDialogComponent', () => {
  let component: DynamicVariableDialogComponent;
  let fixture: ComponentFixture<DynamicVariableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicVariableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicVariableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

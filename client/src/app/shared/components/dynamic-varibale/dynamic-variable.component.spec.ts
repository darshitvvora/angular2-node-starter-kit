import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVariableComponent } from './dynamic-variable.component';

describe('DynamicVariableComponent', () => {
  let component: DynamicVariableComponent;
  let fixture: ComponentFixture<DynamicVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

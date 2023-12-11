import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionalFormComponent } from './transaccional-form.component';

describe('TransaccionalFormComponent', () => {
  let component: TransaccionalFormComponent;
  let fixture: ComponentFixture<TransaccionalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionalFormComponent]
    });
    fixture = TestBed.createComponent(TransaccionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

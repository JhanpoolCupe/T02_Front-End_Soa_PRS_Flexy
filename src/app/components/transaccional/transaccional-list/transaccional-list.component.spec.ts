import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionalListComponent } from './transaccional-list.component';

describe('TransaccionalListComponent', () => {
  let component: TransaccionalListComponent;
  let fixture: ComponentFixture<TransaccionalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionalListComponent]
    });
    fixture = TestBed.createComponent(TransaccionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

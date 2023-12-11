import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenListComponent } from './teen-list.component';

describe('TeenListComponent', () => {
  let component: TeenListComponent;
  let fixture: ComponentFixture<TeenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeenListComponent]
    });
    fixture = TestBed.createComponent(TeenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

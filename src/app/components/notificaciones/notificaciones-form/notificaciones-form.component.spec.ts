import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesFormComponent } from './notificaciones-form.component';

describe('NotificacionesFormComponent', () => {
  let component: NotificacionesFormComponent;
  let fixture: ComponentFixture<NotificacionesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionesFormComponent]
    });
    fixture = TestBed.createComponent(NotificacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

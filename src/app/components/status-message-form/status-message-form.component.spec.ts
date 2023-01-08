import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMessageFormComponent } from './status-message-form.component';

describe('StatusMessageFormComponent', () => {
  let component: StatusMessageFormComponent;
  let fixture: ComponentFixture<StatusMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusMessageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

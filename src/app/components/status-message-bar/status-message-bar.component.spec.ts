import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMessageBarComponent } from './status-message-bar.component';

describe('StatusMessageBarComponent', () => {
  let component: StatusMessageBarComponent;
  let fixture: ComponentFixture<StatusMessageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusMessageBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

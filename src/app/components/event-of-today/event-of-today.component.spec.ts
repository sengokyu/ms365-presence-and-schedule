import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOfTodayComponent } from './event-of-today.component';

describe('EventOfTodayComponent', () => {
  let component: EventOfTodayComponent;
  let fixture: ComponentFixture<EventOfTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOfTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOfTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedExpenseTrackerComponent } from './tabbed-expense-tracker.component';

describe('TabbedExpenseTrackerComponent', () => {
  let component: TabbedExpenseTrackerComponent;
  let fixture: ComponentFixture<TabbedExpenseTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbedExpenseTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabbedExpenseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

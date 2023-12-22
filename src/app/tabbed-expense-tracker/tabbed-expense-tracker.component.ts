import { Component, OnInit } from '@angular/core';
import { ExpenseEntryComponent } from '../expense-entry/expense-entry.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-tabbed-expense-tracker',
  standalone: true,
  imports: [CommonModule, ExpenseEntryComponent, RouterModule, SummaryComponent],
  templateUrl: './tabbed-expense-tracker.component.html',
  styleUrls: ['./tabbed-expense-tracker.component.css'],
})
export class TabbedExpenseTrackerComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDay: string = this.days[0];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const dayParam = params.get('day');
      this.selectDay(dayParam || this.selectedDay);
    });
  }

  selectDay(day: string): void {
    this.selectedDay = day;
    if (day === 'summary') {
      this.router.navigate(['/expense-tracker/summary']);
    }
  }

  getNextDay(): string {
    const currentIndex = this.days.indexOf(this.selectedDay);
    return this.days[currentIndex + 1] || this.selectedDay;
  }

  getPreviousDay(): string {
    const currentIndex = this.days.indexOf(this.selectedDay);
    return this.days[currentIndex - 1] || this.selectedDay;
  }
}
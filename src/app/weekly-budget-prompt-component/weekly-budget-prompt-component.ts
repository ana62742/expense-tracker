import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-budget-prompt-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weekly-budget-prompt-component.html',
  styleUrl: './weekly-budget-prompt-component.css'
})
export class WeeklyBudgetPromptComponent {
  weeklyBudget: number = 0;

  constructor(private expenseService: ExpenseService, private router: Router) {}

  saveBudget(): void {
    const weekStartDate = new Date(2020, 5, 0);
    const budget = { amount: this.weeklyBudget, weekStartDate };
    this.expenseService.setWeeklyBudget(budget);
    this.router.navigate(['/expense-tracker/Monday']);
  }

  navigateToExpenseTracker() {
    this.router.navigate(['/expense-tracker/Monday']);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: { [day: string]: { category: string; amount: number }[] } = {};

  constructor() {
    this.loadExpenses();
  }

  private loadExpenses(): void {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.expenses = JSON.parse(storedExpenses);
    }
  }

  private saveExpensesToLocalStorage(): void {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  addExpense(expense: { category: string; amount: number; day: string }): void {
    if (!this.expenses[expense.day]) {
      this.expenses[expense.day] = [];
    }

    this.expenses[expense.day].push(expense);
    this.saveExpensesToLocalStorage();
  }

  getExpensesByDay(day: string): { category: string; amount: number }[] {
    return this.expenses[day] || [];
  }
  
  getDailyTotal(day: string): number {
    const dailyExpenses = this.expenses[day] || [];
    return dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  }
  
  getWeeklyTotal(): number {
    return Object.values(this.expenses)
      .reduce((weekTotal, dayExpenses) => {
        return (
          weekTotal +
          (dayExpenses ? dayExpenses.reduce((dayTotal, expense) => dayTotal + expense.amount, 0) : 0)
        );
      }, 0);
  }

  getWeeklyExpenses(): { day: string; category: string; amount: number }[] {
    const weeklyExpenses: { day: string; category: string; amount: number }[] = [];
    
    Object.keys(this.expenses).forEach((day) => {
      const dailyExpenses = this.expenses[day];

      dailyExpenses.forEach((expense) => {
        weeklyExpenses.push({
          day,
          category: expense.category,
          amount: expense.amount,
        });
      });
    });

    return weeklyExpenses;
  }

  getWeeklyExpensesByCategory(): { category: string; amount: number }[] {
    const weeklyExpensesByCategory: { [category: string]: number } = {};

    // Iterate through each day
    Object.values(this.expenses).forEach((dayExpenses) => {
      if (dayExpenses) {
        // Iterate through each expense in the day
        dayExpenses.forEach((expense) => {
          // Aggregate expenses by category
          if (!weeklyExpensesByCategory[expense.category]) {
            weeklyExpensesByCategory[expense.category] = 0;
          }
          weeklyExpensesByCategory[expense.category] += expense.amount;
        });
      }
    });

    // Convert the aggregated expenses to the desired format
    const result: { category: string; amount: number }[] = [];
    Object.entries(weeklyExpensesByCategory).forEach(([category, amount]) => {
      result.push({ category, amount });
    });

    return result;
  }
}

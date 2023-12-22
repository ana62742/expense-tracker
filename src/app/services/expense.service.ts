import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor () {}

  setWeeklyBudget(budget: {amount: number, weekStartDate: Date}) {
    fetch('http://localhost:3000/budget', {
      method: 'POST',
      body: JSON.stringify({
        amount: budget.amount,
        weekStartDate: budget.weekStartDate,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json)
    .then(resData => console.log(resData))
    .catch(err => console.log(err))
  }

  getWeeklyBudget(weekStartDate: Date) {
    return fetch(`http://localhost:3000/budget/${weekStartDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  addExpense(expense: { category: string; amount: number; day: string }) {
    fetch('http://localhost:3000/expenses', {
      method: 'POST',
      body: JSON.stringify({
        category: expense.category,
        amount: expense.amount,
        day: expense.day
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json)
    .then(resData => console.log(resData))
    .catch(err => console.log(err))
  }
  
  getExpensesByDay(day: string) {
    return fetch(`http://localhost:3000/expenses/${day}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  getDailyTotal(day: string) {
    return fetch(`http://localhost:3000/daily-total/${day}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  getWeeklyTotal() {
    return fetch('http://localhost:3000/weekly-total', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  getWeeklyExpenses() {
    return fetch('http://localhost:3000/weekly-expenses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  getWeeklyExpensesByCategory() {
    return fetch('http://localhost:3000/weekly-expenses-by-category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading expenses:', error);
      throw error;
    });
  }

  // setWeeklyBudget(budget: number): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/set-weekly-budget`, { budget });
  // }  

  // private expenses: { [day: string]: { category: string; amount: number }[] } = {};

  // constructor() {
  //   this.loadExpenses();
  // }

  // private loadExpenses(): void {
  //   const storedExpenses = localStorage.getItem('expenses');
  //   if (storedExpenses) {
  //     this.expenses = JSON.parse(storedExpenses);
  //   }
  // }

  // private saveExpensesToLocalStorage(): void {
  //   localStorage.setItem('expenses', JSON.stringify(this.expenses));
  // }

  // addExpense(expense: { category: string; amount: number; day: string }): void {
  //   if (!this.expenses[expense.day]) {
  //     this.expenses[expense.day] = [];
  //   }

  //   this.expenses[expense.day].push(expense);
  //   this.saveExpensesToLocalStorage();
  // }

  // getExpensesByDay(day: string): { category: string; amount: number }[] {
  //   return this.expenses[day] || [];
  // }
  
  // getDailyTotal(day: string): number {
  //   const dailyExpenses = this.expenses[day] || [];
  //   return dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  // }
  
  // getWeeklyTotal(): number {
  //   return Object.values(this.expenses)
  //     .reduce((weekTotal, dayExpenses) => {
  //       return (
  //         weekTotal +
  //         (dayExpenses ? dayExpenses.reduce((dayTotal, expense) => dayTotal + expense.amount, 0) : 0)
  //       );
  //     }, 0);
  // }

  // getWeeklyExpenses(): { day: string; category: string; amount: number }[] {
  //   const weeklyExpenses: { day: string; category: string; amount: number }[] = [];
    
  //   Object.keys(this.expenses).forEach((day) => {
  //     const dailyExpenses = this.expenses[day];

  //     dailyExpenses.forEach((expense) => {
  //       weeklyExpenses.push({
  //         day,
  //         category: expense.category,
  //         amount: expense.amount,
  //       });
  //     });
  //   });

  //   return weeklyExpenses;
  // }

  // getWeeklyExpensesByCategory(): { category: string; amount: number }[] {
  //   const weeklyExpensesByCategory: { [category: string]: number } = {};

  //   Object.values(this.expenses).forEach((dayExpenses) => {
  //     if (dayExpenses) {
  //       dayExpenses.forEach((expense) => {
  //         if (!weeklyExpensesByCategory[expense.category]) {
  //           weeklyExpensesByCategory[expense.category] = 0;
  //         }
  //         weeklyExpensesByCategory[expense.category] += expense.amount;
  //       });
  //     }
  //   });

  //   const result: { category: string; amount: number }[] = [];
  //   Object.entries(weeklyExpensesByCategory).forEach(([category, amount]) => {
  //     result.push({ category, amount });
  //   });

  //   return result;
  // }

  // setWeeklyBudget(budget: number): void {
  //   localStorage.setItem('weeklyBudget', JSON.stringify(budget));
  // }
  
  // getWeeklyBudget(): number | null {
  //   const storedBudget = localStorage.getItem('weeklyBudget');
  //   return storedBudget ? JSON.parse(storedBudget) : null;
  // }
}

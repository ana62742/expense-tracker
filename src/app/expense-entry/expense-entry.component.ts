import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css'],
})
export class ExpenseEntryComponent implements OnInit {
  @Input() day: string = '';

  expenseService = inject(ExpenseService); 
  router = inject(Router);

  expenseForm!: FormGroup;
  expenseSaved: boolean = false;
  savedExpense!: { category: string; amount: number };

  expenseCategories: string[] = [
    'Rent/Mortgage',
    'Utilities',
    'Groceries',
    'Transportation',
    'Health/Medical',
    'Subscriptions',
    'Going Out',
    'Entertainment',
    'Clothing',
    'Personal Care',
    'Education',
    'Savings/Investments',
    'Gifts/Donations'
  ];

  constructor(
    private fb: FormBuilder
    ) {}

 ngOnInit(): void {
    this.createExpenseForm();
    this.subscribeToRouteChanges();
    this.loadExpenses();
  }

  createExpenseForm(): void {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
  }

  subscribeToRouteChanges(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadExpenses();
      });
  }

  loadExpenses(): void {
    const expenses = this.expenseService.getExpensesByDay(this.day);
    if (expenses.length > 0) {
      this.expenseSaved = true;
      this.savedExpense = { ...expenses[expenses.length - 1] };
    }
  }

  saveExpense(): void {
    const categoryControl = this.expenseForm.get('category');
    const amountControl = this.expenseForm.get('amount');

    if (categoryControl?.valid && amountControl?.valid) {
      const newExpense = {
        category: categoryControl.value,
        amount: amountControl.value,
        day: this.day,
      };

      this.expenseService.addExpense(newExpense);

      this.savedExpense = { ...newExpense };
      this.expenseSaved = true;
      this.expenseForm.reset();
    }
  }

  getExpensesByDay(): { category: string; amount: number }[] {
    return this.expenseService.getExpensesByDay(this.day);
  }

  getDailyTotal() {
    return this.expenseService.getDailyTotal(this.day);
  }
}

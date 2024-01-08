import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css'],
})
export class ExpenseEntryComponent implements OnInit {
  @Input() day: string = '';

  expenseForm!: FormGroup;
  expenseSaved: boolean = false;
  savedExpense!: { category: string; amount: number };

  dailyExpenses$: Observable<any[]> | undefined;
  dailyTotal$: Observable<any> | undefined;

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
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
    this.createExpenseForm();
    this.subscribeToRouteChanges();
    this.getDailyExpenses();
    this.getDailyTotal();
  }

  createExpenseForm(): void {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
  }

  subscribeToRouteChanges(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.day = params.get('day') || '';
          return this.expenseService.getExpensesByDay(this.day);
        })
      )
      .subscribe(expenses => {
        this.dailyExpenses$ = of(expenses);
      });
    
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.day = params.get('day') || '';
          return this.expenseService.getDailyTotal(this.day);
        })
      )
      .subscribe(total => {
        this.dailyTotal$ = of(total);
      });
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

      this.expenseService.addExpense(newExpense)
      .then((addedExpense) => {
        this.savedExpense = { ...addedExpense };
        this.expenseSaved = true;
        this.expenseForm.reset();
        
        this.getDailyExpenses();
        this.getDailyTotal();
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
    }
  }  

  async getDailyExpenses() {
    try {
      const expenses = await this.expenseService.getExpensesByDay(this.day);
      this.dailyExpenses$ = of(expenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }

  async getDailyTotal() {
    try {
      const total = await this.expenseService.getDailyTotal(this.day);
      this.dailyTotal$ = of(total);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }  
}
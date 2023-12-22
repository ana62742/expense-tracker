import { Component, OnInit } from '@angular/core';
import { DxDataGridModule, DxPieChartModule } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxPieChartModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
    weeklyExpenses$!: Observable<any[]>;
    weeklyExpensesByCategory$!: Observable<any[]>;
    weeklyTotal$!: Observable<any>;
    weeklyBudget$!: Observable<number>;

    constructor(private expenseService: ExpenseService) {}

    ngOnInit(): void {
        this.getWeeklyExpenses();
        this.getWeeklyExpensesByCategory();
        this.getWeeklyTotal();
        this.getWeeklyBudget();
    }

    async getWeeklyExpenses() {
        try {
          const expenses = await this.expenseService.getWeeklyExpenses();
          this.weeklyExpenses$ = of(expenses.expenses);
        } catch (error) {
          console.error('Error loading expenses:', error);
        }
    }

    async getWeeklyExpensesByCategory() {
        try {
          const expenses = await this.expenseService.getWeeklyExpensesByCategory();
          this.weeklyExpensesByCategory$ = of(expenses);
        } catch (error) {
          console.error('Error loading expenses:', error);
        }
    }

    async getWeeklyTotal() {
        try {
          const total = await this.expenseService.getWeeklyTotal();
          this.weeklyTotal$ = of(total.weeklyTotal);
        } catch (error) {
          console.error('Error loading expenses:', error);
        }
    }

    async getWeeklyBudget() {
      try {
        const budget = await this.expenseService.getWeeklyBudget(new Date(2020, 5, 0));
        this.weeklyBudget$ = of(budget[0].amount);
      } catch (error) {
        console.error('Error loading budget:', error);
      }
    }    
//   weeklyExpenses: any[] = [];
//   weeklyExpensesByCategory: any[] = [];
//   weeklyTotal: any;
//   weeklyBudget: any;
//   weeklySavings: any;

//   expenseService = inject(ExpenseService);

//   constructor() {}

//   ngOnInit(): void {
//     this.weeklyExpenses = this.expenseService.getWeeklyExpenses();
//     this.weeklyExpensesByCategory = this.expenseService.getWeeklyExpensesByCategory();
//     this.weeklyTotal = this.expenseService.getWeeklyTotal();
//     this.weeklyBudget = this.expenseService.getWeeklyBudget();
//     this.weeklySavings = this.weeklyBudget - this.weeklyTotal;
//   }
}

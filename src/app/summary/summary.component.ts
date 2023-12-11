import { Component, OnInit, inject } from '@angular/core';
import { DxDataGridModule, DxPieChartModule } from 'devextreme-angular';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxPieChartModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  weeklyExpenses: any[] = [];
  weeklyExpensesByCategory: any[] = [];
  weeklyTotal: any;

  expenseService = inject(ExpenseService);

  constructor() {}

  ngOnInit(): void {
    this.weeklyExpenses = this.expenseService.getWeeklyExpenses();
    this.weeklyExpensesByCategory = this.expenseService.getWeeklyExpensesByCategory();
    this.weeklyTotal = this.expenseService.getWeeklyTotal();
  }
}

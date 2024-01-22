import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, of, switchMap, tap } from 'rxjs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { ExportingEvent } from 'devextreme/ui/data_grid';

import { ExpenseService } from '../services/expense.service';
import { AIService } from '../services/ai.service';

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
    weeklyTotal$!: Observable<number>;
    weeklyBudget$!: Observable<number>;
    weeklySavings!: number;
    investmentRecommendations!: any[];

    constructor(private expenseService: ExpenseService,
                private aiService: AIService) {}

    ngOnInit(): void {
        this.getWeeklyExpenses();
        this.getWeeklyExpensesByCategory();
        this.getWeeklyTotal();
        this.getWeeklyBudget();
        this.getWeeklySavings();
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
    
    async getWeeklySavings() {
      try {
          const weeklyTotal = await this.expenseService.getWeeklyTotal();
          const weeklyBudget = await this.expenseService.getWeeklyBudget(new Date(2020, 5, 0));

          const total = weeklyTotal.weeklyTotal;
          const budget = weeklyBudget[0].amount;

          this.weeklySavings = budget - total;
          this.getInvestmentRecommendations();
      } catch (error) {
          console.error('Error calculating weekly savings:', error);
      }
    }

    getInvestmentRecommendations() {
      this.aiService.getInvestmentRecommendations(this.weeklySavings)
        .then((response) => {
          const recommendations = response.recommendations;
          this.investmentRecommendations = recommendations;
          console.log(recommendations);
        })
        .catch((error) => {
          console.error('Error getting investment recommendations:', error);
        });
    }

    onExporting(e: ExportingEvent) {
      const workbook = new Workbook();    
      const worksheet = workbook.addWorksheet('Main sheet');
      exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          customizeCell: function(options) {
              options.excelCell.font = { name: 'Arial', size: 12 };
              options.excelCell.alignment = { horizontal: 'left' };
          } 
      }).then(function() {
          workbook.xlsx.writeBuffer()
              .then(function(buffer: BlobPart) {
                  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
              });
      });
  }
}

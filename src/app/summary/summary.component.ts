import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';
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
    weeklyTotal$!: Observable<any>;
    investmentRecommendations$!: Observable<any>;
    weeklyBudget$!: Observable<number>;

    constructor(private expenseService: ExpenseService,
                private aiService: AIService) {}

    ngOnInit(): void {
        this.getWeeklyExpenses();
        this.getWeeklyExpensesByCategory();
        this.getWeeklyTotal();
        this.getWeeklyBudget();
        this.getInvestmentRecommendations();
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
    
    async getInvestmentRecommendations() {
      try {
        await this.getWeeklyBudget();
        await this.getWeeklyTotal();
        forkJoin([this.weeklyBudget$, this.weeklyTotal$]).subscribe(
          ([budget, total]) => {
              const savings = budget - total;
              this.aiService.getInvestmentRecommendations(savings).subscribe(
                  (recommendations) => {
                      this.investmentRecommendations$ = of(recommendations);
                  },
                  (error) => {
                      console.error('Error getting investment recommendations:', error);
                  }
              );
          },
          (error) => {
              console.error('Error getting weekly budget and total:', error);
          }
      );
      } catch(error) {
        console.error('Error generating recomendations:', error);
      }
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

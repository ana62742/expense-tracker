import { Routes } from '@angular/router';
import { TabbedExpenseTrackerComponent } from './tabbed-expense-tracker/tabbed-expense-tracker.component';
import { SummaryComponent } from './summary/summary.component';
import { WeeklyBudgetPromptComponent } from './weekly-budget-prompt-component/weekly-budget-prompt-component';

export const routes: Routes = [
    { path: 'expense-tracker/:day', component: TabbedExpenseTrackerComponent },
    { path: 'expense-tracker/summary', component: SummaryComponent },
    { path: 'weekly-budget-prompt', component: WeeklyBudgetPromptComponent },
    { path: '', redirectTo: '/weekly-budget-prompt', pathMatch: 'full' },
    { path: '**', redirectTo: '/weekly-budget-prompt' }
];

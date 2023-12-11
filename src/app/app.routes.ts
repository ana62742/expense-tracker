import { Routes } from '@angular/router';
import { TabbedExpenseTrackerComponent } from './tabbed-expense-tracker/tabbed-expense-tracker.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
    { path: 'expense-tracker/:day', component: TabbedExpenseTrackerComponent },
    { path: 'expense-tracker/summary', component: SummaryComponent },
    { path: '', redirectTo: '/expense-tracker/Monday', pathMatch: 'full' },
    { path: '**', redirectTo: '/expense-tracker/Monday' }
];

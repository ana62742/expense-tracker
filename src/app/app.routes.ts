import { Routes } from '@angular/router';
import { TabbedExpenseTrackerComponent } from './tabbed-expense-tracker/tabbed-expense-tracker.component';
import { WeeklyBudgetPromptComponent } from './weekly-budget-prompt-component/weekly-budget-prompt-component';
import { AuthComponent } from './auth/auth.component';
import { SummaryComponent } from './summary/summary.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'expense-tracker/:day', component: TabbedExpenseTrackerComponent, canActivate: [authGuard] },
    { path: 'expense-tracker/summary', component: SummaryComponent, canActivate: [authGuard] },
    { path: 'weekly-budget-prompt', component: WeeklyBudgetPromptComponent, canActivate: [authGuard] },
    { path: 'auth', component: AuthComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth' }
];

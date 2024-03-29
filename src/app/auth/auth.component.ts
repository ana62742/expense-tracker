import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, AngularFireModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  form!: FormGroup;
  email: string = '';
  password: string = '';
  isLoggingIn = false;

  constructor(
    private authenticationService: AuthenticationService,
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService
      .signIn({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['weekly-budget-prompt']),
        error: (error) => {
          this.isLoggingIn = false;
          alert(error.message);
        },
      });
  }

  register() {
    this.isLoggingIn = true;

    this.authenticationService
      .register({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['weekly-budget-prompt']),
        error: (error) => {
          alert(error.message);
        },
      });
  }

  logout() {
    this.authenticationService.logout();
  }
}

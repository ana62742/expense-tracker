import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { catchError, from, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _isLoggedIn = false;
  get isAuthenticated(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      ),
      tap(() => this._isLoggedIn = true)
    );
  }

  register(params: SignIn) {
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      ),
      tap(() => this._isLoggedIn = true)
  );
  }
  
  logout() {
    this.auth.signOut()
      .then(() => {
        this._isLoggedIn = false;
        this.router.navigate(['/auth']);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      })
      tap(() => this._isLoggedIn = false)
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    if ( code === "auth/invalid-login-credentials") {
      return "Invalid login credentials.";
    }
    return message;
  }

}

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};
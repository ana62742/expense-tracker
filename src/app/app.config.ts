import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  provideAuth
} from '@angular/fire/auth';

import { routes } from './app.routes';
import { firebase } from '../environments/environment.development';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebase)),
      provideAuth(() => getAuth())
    ]),
    {provide: FIREBASE_OPTIONS, useValue: firebase}
  ]
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
  ]
};

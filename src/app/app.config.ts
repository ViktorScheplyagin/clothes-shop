import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

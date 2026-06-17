import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // 👈 Quitamos 'withHashLocation' de los imports
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // 👈 Dejamos solo las rutas limpias, sin el hash location
    provideHttpClient(),
    provideAnimations()
  ]
};
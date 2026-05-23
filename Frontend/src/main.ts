import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// TODO Download fonts locally so that the website isn't dependent on Google font servers

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

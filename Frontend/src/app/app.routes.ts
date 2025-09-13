import { Route } from '@angular/router';
import { MainHomePageComponent } from './modules/home-page/pages/main-home-page/main-home-page.component';

export const appRoutes: Route[] = [
    {path: 'home', component: MainHomePageComponent},
    {path: '**', redirectTo: 'home'}
];

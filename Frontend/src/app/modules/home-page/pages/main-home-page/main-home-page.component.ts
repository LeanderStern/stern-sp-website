import { Component, OnInit } from '@angular/core';
import { ALREADY_VISITED } from '../../../shared/constants/session-storage';

@Component({
  selector: 'app-main-home-page.component',
    imports: [],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.scss',
})
export class MainHomePageComponent implements OnInit {

    public showSplashScreen: boolean;

    public ngOnInit(): void {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return
        }
        this.showSplashScreen = Boolean(sessionStorage.getItem(ALREADY_VISITED));
        if (this.showSplashScreen === false) {
            sessionStorage.setItem(ALREADY_VISITED, 'true');
        }
    }
}

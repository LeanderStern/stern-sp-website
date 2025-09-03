import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ALREADY_VISITED } from '../shared/constants/session-storage';

@Component({
    imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'Frontend';
  public showSplashScreen: boolean

  public constructor() {
  }

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

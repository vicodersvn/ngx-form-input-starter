import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'app';
  public active = false;
  public ngDestroyed$ = new Subject();

  constructor(private router: Router) {
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(() => {
        this.active = false;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  toggle(active): void {
    this.active = !active;
  }
}

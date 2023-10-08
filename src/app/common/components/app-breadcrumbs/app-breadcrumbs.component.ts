import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './app-breadcrumbs.component.html',
  styleUrls: ['./app-breadcrumbs.component.css']
})
export class AppBreadcrumbsComponent implements OnDestroy {

  title!: string;
  titleSubs$!: Subscription;

  constructor(private router: Router ) {
    this.titleSubs$ = this.getRouteDetails().subscribe(({title}) => {
      this.title = title;
      document.title = `Admin Laundry - ${title}`;
    })
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getRouteDetails(): Observable<any> {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter ( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data)
      )
  }
}

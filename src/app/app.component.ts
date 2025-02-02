import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: ` <div>
    <!--- [@routeAnimations]="getRouteAnimationData()" -->
    <router-outlet></router-outlet>
  </div>`,
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}

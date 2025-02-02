import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserListComponent } from './components/user-list/user-list.component';

const canActivate = [autoLoginPartialRoutesGuard];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate,
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate,
    data: { animation: 'SettingsPage' },
  },
  { path: 'callback', component: CallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

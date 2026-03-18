import { Routes } from '@angular/router';
import { HubComponent } from './pages/hub/hub.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: HubComponent },
  { path: ':slug', component: LandingComponent }
];

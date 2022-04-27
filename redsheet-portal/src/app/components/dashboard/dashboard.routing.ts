import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {DashboardComponent } from './dashboard.component';

const DASHBOARD_ROUTES: Routes = [{
    path: '', component: DashboardComponent
},
];

export const DASHBOARD_ROUTING: ModuleWithProviders = RouterModule.forChild(DASHBOARD_ROUTES);
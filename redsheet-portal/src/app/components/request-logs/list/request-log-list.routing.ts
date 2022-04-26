import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { RequestLogListComponent } from './request-log-list.component';

const REQUEST_LOG_LIST_ROUTES: Routes = [{
    path: '', component: RequestLogListComponent
},
];

export const REQUEST_LOG_LIST_ROUTING: ModuleWithProviders = RouterModule.forChild(REQUEST_LOG_LIST_ROUTES);
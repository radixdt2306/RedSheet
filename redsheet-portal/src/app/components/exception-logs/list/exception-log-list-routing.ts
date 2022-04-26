import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceptionLogListComponent } from "app/components/exception-logs/list/exception-log-list.component";


const EXCEPTION_LOG_LIST_ROUTES: Routes = [{
    path: '', component: ExceptionLogListComponent
}];

export const EXCEPTION_LOG_LIST_ROUTING: ModuleWithProviders = RouterModule.forChild(EXCEPTION_LOG_LIST_ROUTES);
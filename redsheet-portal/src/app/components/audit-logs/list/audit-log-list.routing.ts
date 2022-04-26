import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditLogListComponent } from "app/components/audit-logs/list/audit-log-list.component";


const AUDIT_LOG_LIST_ROUTES: Routes = [{
    path: '', component: AuditLogListComponent
}];

export const AUDIT_LOG_LIST_ROUTING: ModuleWithProviders = RouterModule.forChild(AUDIT_LOG_LIST_ROUTES);
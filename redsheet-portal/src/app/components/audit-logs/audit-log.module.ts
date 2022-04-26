import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { AUDIT_LOG_ROUTING } from "app/components/audit-logs/audit-log.routing";

@NgModule({
    imports: [AUDIT_LOG_ROUTING],
    exports: [RouterModule],
    providers: [AuditLogService]
})
export class AuditLogModule { }
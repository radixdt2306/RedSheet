import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";

import { AuditLogListComponent } from './audit-log-list.component'
import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { AuditLogSharedComponentModule } from "app/components/audit-logs/audit-log-shared.component.module";
import { AUDIT_LOG_LIST_ROUTING } from "app/components/audit-logs/list/audit-log-list.routing";

@NgModule({
    imports: [
        AUDIT_LOG_LIST_ROUTING,
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, AuditLogSharedComponentModule
    ],
    declarations: [],
    exports: [RouterModule],
    providers: [AuditLogService]
})
export class AuditLogListModule { }
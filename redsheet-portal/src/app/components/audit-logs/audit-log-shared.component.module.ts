import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { DynamicComponentContainer } from '@rx/core';
import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { AuditLogListComponent } from "app/components/audit-logs/list/audit-log-list.component";
import { AuditLogDetailComponent } from "app/components/audit-logs/edit/audit-log-detail.component";
import { AUDIT_LOG_SHARED_COMPONENT_CONTAINER } from "app/components/audit-logs/audit-log-shared-component.container";

@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [AuditLogDetailComponent, AuditLogListComponent  ],
    providers: [AuditLogService],
    exports: [RouterModule, AuditLogDetailComponent, AuditLogListComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuditLogSharedComponentModule { }
DynamicComponentContainer.register(AUDIT_LOG_SHARED_COMPONENT_CONTAINER );
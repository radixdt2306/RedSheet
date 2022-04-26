import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {CommonModule } from "@angular/common";
import {RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTING } from './dashboard.routing';
import {RxTableModule } from "@rx/table";
import {RxViewModule } from "@rx/view";
import { ProjectsService } from 'app/components/project/projects/projects.service';
import { DashboardService } from "app/components/dashboard/dashboard.service";
import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { PdfService } from 'app/components/pdf/pdf.service';
import { AppDirectiveModule } from 'app/components/shared/directives/app.directive.module';

@NgModule({
    imports: [DASHBOARD_ROUTING, CommonModule, RxTableModule, RxViewModule,AppDirectiveModule,],
    declarations: [DashboardComponent],
    providers: [ProjectsService,DashboardService,AuditLogService,PdfService],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";

import { RequestLogListComponent } from './request-log-list.component'
import { RequestLogService } from "app/components/request-logs/request-log.service";
import { REQUEST_LOG_LIST_ROUTING } from "app/components/request-logs/list/request-log-list.routing";
import { RequestLogSharedComponentModule } from "app/components/request-logs/request-log-shared.component.module";

@NgModule({
    imports: [
        REQUEST_LOG_LIST_ROUTING,
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, RequestLogSharedComponentModule
    ],
    declarations: [],
    exports: [RouterModule],
    providers: [RequestLogService]
})

export class RequestLogListModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";

import { ExceptionLogListComponent } from './exception-log-list.component'
import { ExceptionLogService } from "app/components/exception-logs/exception-log.service";
import { EXCEPTION_LOG_LIST_ROUTING } from "app/components/exception-logs/list/exception-log-list-routing";
import { ExceptionLogSharedComponentModule } from "app/components/exception-logs/exception-log-shared-component.module";

@NgModule({
    imports: [
        EXCEPTION_LOG_LIST_ROUTING,
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, ExceptionLogSharedComponentModule
    ],
    declarations: [],
    exports: [RouterModule],
    providers: [ExceptionLogService]
})
export class ExceptionLogListModule { }
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { DynamicComponentContainer } from '@rx/core';
import { ExceptionLogService } from "app/components/exception-logs/exception-log.service";
import { ExceptionLogListComponent } from "app/components/exception-logs/list/exception-log-list.component";
import { ExceptionLogDetailComponent } from "app/components/exception-logs/edit/exception-log-detail.component";
import { EXCEPTION_LOG_SHARED_COMPONENT_CONTAINER } from "app/components/exception-logs/exception-log-shared-component.container";

@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ExceptionLogDetailComponent, ExceptionLogListComponent ],
    providers: [ExceptionLogService],
    exports: [RouterModule, ExceptionLogDetailComponent, ExceptionLogListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExceptionLogSharedComponentModule { }
DynamicComponentContainer.register(EXCEPTION_LOG_SHARED_COMPONENT_CONTAINER );
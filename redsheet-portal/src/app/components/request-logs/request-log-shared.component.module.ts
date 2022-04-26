import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { DynamicComponentContainer } from '@rx/core';
import { RequestLogService } from "app/components/request-logs/request-log.service";
import { RequestLogListComponent } from "app/components/request-logs/list/request-log-list.component";
import { RequestLogDetailComponent } from "app/components/request-logs/edit/request-log-detail.component";
import { REQUEST_LOG_SHARED_COMPONENT_CONTAINER } from "app/components/request-logs/request-log-shared-component.container";

@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [RequestLogDetailComponent,RequestLogListComponent ],
    providers: [RequestLogService],
    exports: [RouterModule, RequestLogDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestLogSharedComponentModule { }
DynamicComponentContainer.register(REQUEST_LOG_SHARED_COMPONENT_CONTAINER);
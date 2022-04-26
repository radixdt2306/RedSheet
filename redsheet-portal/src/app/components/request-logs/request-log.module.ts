import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { RequestLogService } from "app/components/request-logs/request-log.service";
import { REQUEST_LOG_ROUTING } from "app/components/request-logs/request-log.routing";

@NgModule({
    imports: [REQUEST_LOG_ROUTING],
    exports: [RouterModule],
    providers: [RequestLogService]
})
export class RequestLogModule { }
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ExceptionLogService } from "app/components/exception-logs/exception-log.service";
import { EXCEPTION_LOG_ROUTING } from "app/components/exception-logs/exception-log.routing";

@NgModule({
    imports: [EXCEPTION_LOG_ROUTING],
    exports: [RouterModule],
    providers: [ExceptionLogService]
})
export class ExceptionLogModule { }
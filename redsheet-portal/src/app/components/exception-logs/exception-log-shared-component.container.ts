import { ComponentContainer } from "@rx/core"
import { ExceptionLogListComponent } from "app/components/exception-logs/list/exception-log-list.component";
import { ExceptionLogDetailComponent } from "app/components/exception-logs/edit/exception-log-detail.component";

export const EXCEPTION_LOG_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
    {
        component: ExceptionLogDetailComponent,
        accessItem: 'edit',
        applicationModuleId: 27,
        keyName: 'applicationExceptionLogId',
        childModuleName: 'ExceptionLogs',
        rootModuleId: 25
    },
];


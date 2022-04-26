import { ComponentContainer } from "@rx/core"
import { RequestLogListComponent } from "app/components/request-logs/list/request-log-list.component";
import { RequestLogDetailComponent } from "app/components/request-logs/edit/request-log-detail.component";

export const REQUEST_LOG_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
    {
        component: RequestLogDetailComponent,
        accessItem: 'edit',
        applicationModuleId: 26,
        keyName: 'requestLogId',
        childModuleName: '',
        rootModuleId: 25
    },
];

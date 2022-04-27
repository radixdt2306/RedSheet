import { ComponentContainer } from "@rx/core"
import { AuditLogListComponent } from "app/components/audit-logs/list/audit-log-list.component";
import { AuditLogDetailComponent } from "app/components/audit-logs/edit/audit-log-detail.component";

export const AUDIT_LOG_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
    {
        component: AuditLogDetailComponent,
        accessItem: 'edit',
        applicationModuleId: 28,
        keyName: 'auditRecordDetailId',
        childModuleName: 'AuditLogs',
        rootModuleId: 25
    },
];


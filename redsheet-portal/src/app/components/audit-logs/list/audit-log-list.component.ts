import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation } from '@rx/forms';



import { CommonLookups } from "app/lookups/CommonLookups";

import { AuditLogSearchModel } from "app/models/audit-log-search-model";
import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { AuditLogLookupGroup, AuditLogViewModel } from "app/components/audit-logs/domain/audit-log.models";
import { AuditLogDetailComponent } from "app/components/audit-logs/edit/audit-log-detail.component";
import { AuditLogDomain } from "app/components/audit-logs/domain/audit-log.domain";

@Component({
    templateUrl: './audit-log-list.component.html',
    entryComponents: [AuditLogDetailComponent],
})
export class AuditLogListComponent extends AuditLogDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    auditLogSearchFormGroup: FormGroup;
    auditLogLookupGroup:AuditLogLookupGroup;
    auditRequestId: number;
    auditLogs: AuditLogViewModel[]
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private auditLogService: AuditLogService,
    ) { super();
        this.popup.setComponent(componentFactoryResolver);
     }

    ngOnInit(): void {
         this.auditLogService.lookup([
            CommonLookups.applicationModules, CommonLookups.users,CommonLookups.applicationTimeZone
        ]).then(
            (response: AuditLogLookupGroup) => {
                this.auditLogLookupGroup = new AuditLogLookupGroup();
                this.auditLogLookupGroup = response;
                this.auditLogLookupGroup.requestMethods=["Added","Updated","Deleted"]
                this.auditLogSearchFormGroup = this.validation.getFormGroup(new AuditLogSearchModel());
                this.showComponent = true;
            });
    }

    searchAuditLog(): void{
        this.auditLogService.search(this.auditLogSearchFormGroup.value).subscribe(auditSearchResult => {
            this.auditLogs = auditSearchResult;
        });
    }

    viewAuditDetails(auditLog: AuditLogViewModel): void{
        this.popup.show(AuditLogDetailComponent, { auditRequestId: auditLog.auditRequestId });
    }


    resetSearchAuditLog(): void{
        this.auditLogSearchFormGroup.reset(new AuditLogSearchModel())
        this.auditLogs = [];
    }
    
    ngOnDestroy(): void {
        super.destroy();
    }
}

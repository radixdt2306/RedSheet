import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
 import { AuditLogService } from "app/components/audit-logs/audit-log.service";
 import { AuditRecordDetails } from "../domain/audit-log.models";
 import { AuditLogDomain } from "app/components/audit-logs/domain/audit-log.domain";

@Component({
    templateUrl: './audit-log-detail.component.html',
    providers: [AuditLogService],
})
export class AuditLogDetailComponent extends AuditLogDomain implements OnInit, OnDestroy {
     showComponent: boolean = false;
     viewSubscription: Subscription;
     @Input() auditRequestId: number;
    applicationAuditLog: AuditRecordDetails[];
    selectedAuditRecordId:number
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private auditLogService: AuditLogService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.showComponent = true;
        this.auditLogService.getBy([this.auditRequestId]).subscribe(applicationAuditLog => {
            this.applicationAuditLog = applicationAuditLog;
            this.showComponent = true;
        });
    }

    ngOnDestroy(): void {
        if (this.viewSubscription)
            this.viewSubscription.unsubscribe();
        super.destroy();
    }

    hideAuditLogDetail(): void {
        this.popup.hide(AuditLogDetailComponent);
    }
}
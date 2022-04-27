import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { RequestLogService } from "app/components/request-logs/request-log.service";
import { vRequestLog } from "app/database-models";
import { RequestLogDomain } from "app/components/request-logs/domain/request-log.domain";


@Component({
    templateUrl: './request-log-detail.component.html',
    providers: [RequestLogService],
})
export class RequestLogDetailComponent extends RequestLogDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    viewSubscription: Subscription;
    @Input() requestLogId: number;
    requestLog: vRequestLog;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private requestLogService: RequestLogService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.requestLogService.getBy([this.requestLogId]).subscribe(requestLog => {
            this.requestLog = requestLog;
            this.showComponent = true;
        });
    }
  
    ngOnDestroy(): void {
        if (this.viewSubscription)
            this.viewSubscription.unsubscribe();
        super.destroy();
    }

    hideRequestLogDetail(): void {
        this.popup.hide(RequestLogDetailComponent);
    }
}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { vApplicationExceptionLog } from "app/database-models";
import { ExceptionLogService } from "app/components/exception-logs/exception-log.service";
import { ExceptionLogDomain } from "app/components/exception-logs/domain/exception-log.domain";

@Component({
    templateUrl: './exception-log-detail.component.html',
    providers: [ExceptionLogService],
})
export class ExceptionLogDetailComponent extends ExceptionLogDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    viewSubscription: Subscription;
    @Input() applicationExceptionLogId: number;
    applicationExceptionLog: vApplicationExceptionLog;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private exceptionLogService: ExceptionLogService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.exceptionLogService.getBy([this.applicationExceptionLogId]).subscribe(applicationExceptionLog => {
            this.applicationExceptionLog = applicationExceptionLog;
            this.showComponent = true;
        });
    }

    ngOnDestroy(): void {
        if (this.viewSubscription)
            this.viewSubscription.unsubscribe();
        super.destroy();
    }

    hideExceptionLogDetail(): void {
        this.popup.hide(ExceptionLogDetailComponent);
    }
}

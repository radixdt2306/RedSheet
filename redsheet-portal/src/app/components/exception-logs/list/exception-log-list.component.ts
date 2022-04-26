import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation } from '@rx/forms';


import { CommonLookups } from "app/lookups/CommonLookups";
import { LogSearchModel } from "app/models";
import { ExceptionLogDomain } from "app/components/exception-logs/domain/exception-log.domain";
import { ExceptionLogViewModel, ExceptionLogLookupGroup } from "app/components/exception-logs/domain/exception-log.models";
import { ExceptionLogService } from "app/components/exception-logs/exception-log.service";
import { ExceptionLogDetailComponent } from "app/components/exception-logs/edit/exception-log-detail.component";

@Component({
    templateUrl: './exception-log-list.component.html',
    entryComponents: [ExceptionLogDetailComponent],
})
export class ExceptionLogListComponent extends ExceptionLogDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    exceptionLogSearchFormGroup: FormGroup;
    exceptionLogLookupGroup:ExceptionLogLookupGroup;
    applicationExceptionLogId: number;
    exceptionLogs: ExceptionLogViewModel[]
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private exceptionLogService: ExceptionLogService,
    ) { super();
        this.popup.setComponent(componentFactoryResolver);
     }

    ngOnInit(): void {
         this.exceptionLogService.lookup([
            CommonLookups.applicationModules, CommonLookups.users,
        ]).then(
            (response: ExceptionLogLookupGroup) => {
                this.exceptionLogLookupGroup = new ExceptionLogLookupGroup();
                this.exceptionLogLookupGroup = response;
                this.exceptionLogSearchFormGroup = this.validation.getFormGroup(new LogSearchModel());
                this.searchExceptionLog();
                this.showComponent = true;
            });
    }

    searchExceptionLog(): void{
        this.exceptionLogService.search(this.exceptionLogSearchFormGroup.value).subscribe(exceptionSearchResult => {
            this.exceptionLogs = exceptionSearchResult;
        });
    }

    viewExceptionDetails(exceptionLog: ExceptionLogViewModel): void{
        this.popup.show(ExceptionLogDetailComponent, { applicationExceptionLogId: exceptionLog.applicationExceptionLogId });
    }


    resetSearchExceptionLog(): void{
        this.exceptionLogSearchFormGroup.reset(new LogSearchModel())
        this.searchExceptionLog();
    }
    
    ngOnDestroy(): void {
        super.destroy();
    }
}

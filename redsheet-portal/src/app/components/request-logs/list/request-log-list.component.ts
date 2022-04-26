import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation } from '@rx/forms';


import { CommonLookups } from "app/lookups/CommonLookups";
import { RequestLogDetailComponent } from "app/components/request-logs/edit/request-log-detail.component";
import { RequestLogDomain } from "app/components/request-logs/domain/request-log.domain";
import { RequestLogLookupGroup, RequestLogViewModel } from "app/components/request-logs/domain/request-log.models";
import { RequestLogService } from "app/components/request-logs/request-log.service";
import { LogSearchModel } from "app/models";


@Component({
    templateUrl: './request-log-list.component.html',
    entryComponents: [RequestLogDetailComponent],
})
export class RequestLogListComponent extends RequestLogDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    requestLogSearchFormGroup: FormGroup;
    requestLogLookupGroup:RequestLogLookupGroup;
    requestLogId: number;
    requestLogs: RequestLogViewModel[]
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private requestLogService: RequestLogService,
    ) { super();
        this.popup.setComponent(componentFactoryResolver);
     }

    ngOnInit(): void {
         this.requestLogService.lookup([
            CommonLookups.applicationModules, CommonLookups.users,
        ]).then(
            (response: RequestLogLookupGroup) => {
                this.requestLogLookupGroup = new RequestLogLookupGroup();
                this.requestLogLookupGroup = response;
                this.requestLogSearchFormGroup = this.validation.getFormGroup(new LogSearchModel());
                this.searchRequestLog();
                this.showComponent = true;
            });
    }

    searchRequestLog():void{
        this.requestLogService.search(this.requestLogSearchFormGroup.value).subscribe(requestLogSearchResult => {
            this.requestLogs = requestLogSearchResult;
        });
    }

    viewRequestDetails(requestLog:RequestLogViewModel):void{
        this.popup.show(RequestLogDetailComponent, { requestLogId: requestLog.requestLogId });
    }


    resetSearchRequestLog(): void{
        this.requestLogSearchFormGroup.reset(new LogSearchModel())
        this.searchRequestLog();
    }
    
    ngOnDestroy(): void {
        super.destroy();
    }
}

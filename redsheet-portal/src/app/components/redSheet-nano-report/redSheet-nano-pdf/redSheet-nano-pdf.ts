import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxDialog, DialogClick } from '@rx/view';

import { ApplicationConfiguration} from "@rx/core"
import { NanoPdfService } from 'app/components/redSheet-nano-report/redSheet-nano-report.service';
import { nanoNegotationPlanReportComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-negotation-plan-report/nano-negotation-plan-report.component';
import { nanoAboutThisNegotiationEventComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-about-this-negotiation-event/nano-about-this-negotiation-event.component';
import { nanoOurRelativePowerPositionComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-our-relative-power-position/nano-our-relative-power-position.component';
import { nanoNegotiablesAndEventPlanComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-negotiables-and-event-plan/nano-negotiables-and-event-plan.component';




@Component({
    templateUrl: './redSheet-nano-pdf.html',
    entryComponents: [nanoNegotationPlanReportComponent,nanoAboutThisNegotiationEventComponent,nanoOurRelativePowerPositionComponent,nanoNegotiablesAndEventPlanComponent]
})

export class redSheetNanoPdfComponent  implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectId: number;
    listSubscription: Subscription;
    nanoReportData: any;
    constructor(
        private nanoPdfService: NanoPdfService,
        private activatedRoute: ActivatedRoute,
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) {
       
    }

    ngOnInit(): void 
    {
        this.projectId = this.activatedRoute.snapshot.queryParams["projectId"];
        this.nanoPdfService.nanoHtmlToPdfData(this.projectId).subscribe(t => {
            this.nanoReportData = t;
           this.showComponent = true;
        }, error => {

        });
    }
    ngOnDestroy(): void 
    {
        
    }
}

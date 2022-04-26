import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxDialog, DialogClick } from '@rx/view';

import { ApplicationConfiguration} from "@rx/core"

import { liteBackgroundReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/liteBackGround-report/liteBackGround-report.component';
import { thisNegotiationEventReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/this-negotiation-event-report/this-negotiation-event-report.component';
import { ourTeamAndOpponentReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/our-team-and-opponent-report/our-team-and-opponent-report.component';
import { ourRelativePowerPositionLiteReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/our-relative-power-position-lite-report/our-relative-power-position-lite-report.component';
import { negotiablesPlanLiteReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/negotiables-plan-lite-report/negotiables-plan-lite-report-component';
import { negotiationEventPlanReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/negotiation-event-plan-report/negotiation-event-plan-report.component';
import { LitePdfService } from 'app/components/redSheet-lite-report/redSheet-lite-report.service';



@Component({
    templateUrl: './redSheet-lite-pdf.html',
    entryComponents: [liteBackgroundReportComponent,thisNegotiationEventReportComponent,ourTeamAndOpponentReportComponent,
        ourRelativePowerPositionLiteReportComponent,negotiablesPlanLiteReportComponent,negotiationEventPlanReportComponent]
})
// negotiablesPlanReportComponent

export class redSheetLitePdfComponent  implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectId: number;
    listSubscription: Subscription;
    liteReportData: any;
    constructor(
        private litePdfService: LitePdfService,
        private activatedRoute: ActivatedRoute,
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) {
       
    }

    ngOnInit(): void 
    {
        this.projectId = this.activatedRoute.snapshot.queryParams["projectId"];
        this.litePdfService.htmlToPdfLiteData(this.projectId).subscribe(t => {
            this.liteReportData = t;
           this.showComponent = true;
        }, error => {

        });
    }
    ngOnDestroy(): void 
    {
        
    }
}

import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxDialog, DialogClick } from '@rx/view';

import { ApplicationConfiguration} from "@rx/core"
import { backgroundReportComponent } from './backGround-report/background-report.component';
import { PdfService } from 'app/components/pdf/pdf.service';
import { negotiationEventReportComponent } from './negotiation-event-report/negotiation-event-report-component';
import { stakeholderEngagementReportComponent } from 'app/components/pdf/redSheet-full-pdf/stakeholder-engagement-report/stakeholder-engagement-report-component';
import { ourTeamReportComponent } from 'app/components/pdf/redSheet-full-pdf/our-team-report/our-team-report-component';
import { negotiationPowerPlanReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiation-power-plan-report/negotiation-power-plan-report.component';
import { preEventActionPlanningReportComponent } from 'app/components/pdf/redSheet-full-pdf/pre-event-action-planning-report/pre-event-action-planning-report.component';
import { theirTeamNegotiableReportComponent } from 'app/components/pdf/redSheet-full-pdf/theirTeam-negotiable-report/theirTeam-negotiable-report.component';
import { outcomesAndLearningReportComponent } from 'app/components/pdf/redSheet-full-pdf/outcomes-and-learning-report/outcomes-and-learning-report-component';
import { postEventActionsAndImplementationsReportComponent } from 'app/components/pdf/redSheet-full-pdf/post-event-actions-and-implementations-report/post-event-actions-and-implementations-report-component';
import { eventManagementAndTimelineReportComponent } from 'app/components/pdf/redSheet-full-pdf/event-management-and-timeline-report/event-management-and-timeline-report-component';
import { negotiationPowerPlanGameReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiation-power-plan-game-report/negotiation-power-plan-game-report.component';
import { cultureReportComponent } from 'app/components/pdf/redSheet-full-pdf/culture-report/culture-report-component';
import { ourRelativePowerPositionReportComponent } from 'app/components/pdf/redSheet-full-pdf/our-relative-power-position-report/our-relative-power-position-report.component';
import { negotiablesPlanReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiables-plan-report/negotiables-plan-report-component';


@Component({
    templateUrl: './redSheet-full-pdf.html',
    entryComponents: [backgroundReportComponent,negotiationEventReportComponent,stakeholderEngagementReportComponent,ourTeamReportComponent,theirTeamNegotiableReportComponent,
        preEventActionPlanningReportComponent,negotiationPowerPlanReportComponent,outcomesAndLearningReportComponent,
        postEventActionsAndImplementationsReportComponent,eventManagementAndTimelineReportComponent,negotiationPowerPlanGameReportComponent
        ,cultureReportComponent,ourRelativePowerPositionReportComponent,negotiablesPlanReportComponent]
})


export class redSheetFullPdfComponent  implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectId: number;
    listSubscription: Subscription;
    reportData: any;
    constructor(
        private pdfService: PdfService,
        private activatedRoute: ActivatedRoute,
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) {
       
    }

    ngOnInit(): void 
    {
        this.projectId = this.activatedRoute.snapshot.queryParams["projectId"];
        this.pdfService.htmlToPdfData(this.projectId).subscribe(t => {
            this.reportData = t;
           this.showComponent = true;
        }, error => {

        });
    }
    ngOnDestroy(): void 
    {
        
    }
}

import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {CommonModule } from "@angular/common";
import {RouterModule } from '@angular/router';
import {RxTableModule } from "@rx/table";
import {RxViewModule } from "@rx/view";
import { PdfService } from 'app/components/pdf/pdf.service';
import { redSheetFullPdfComponent } from './redSheet-full-pdf/redSheet-full-pdf';
import { PDF_ROUTING } from './pdf.routing';
import { backgroundReportComponent } from 'app/components/pdf/redSheet-full-pdf/backGround-report/background-report.component';
import { negotiationEventReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiation-event-report/negotiation-event-report-component';
import { theirTeamNegotiableReportComponent } from 'app/components/pdf/redSheet-full-pdf/theirTeam-negotiable-report/theirTeam-negotiable-report.component';
import { preEventActionPlanningReportComponent } from 'app/components/pdf/redSheet-full-pdf/pre-event-action-planning-report/pre-event-action-planning-report.component';
import { negotiationPowerPlanReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiation-power-plan-report/negotiation-power-plan-report.component';
import { stakeholderEngagementReportComponent } from 'app/components/pdf/redSheet-full-pdf/stakeholder-engagement-report/stakeholder-engagement-report-component';
import { ourTeamReportComponent } from 'app/components/pdf/redSheet-full-pdf/our-team-report/our-team-report-component';
import { outcomesAndLearningReportComponent } from 'app/components/pdf/redSheet-full-pdf/outcomes-and-learning-report/outcomes-and-learning-report-component';
import { postEventActionsAndImplementationsReportComponent } from 'app/components/pdf/redSheet-full-pdf/post-event-actions-and-implementations-report/post-event-actions-and-implementations-report-component';
import { eventManagementAndTimelineReportComponent } from 'app/components/pdf/redSheet-full-pdf/event-management-and-timeline-report/event-management-and-timeline-report-component';
import { negotiationPowerPlanGameReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiation-power-plan-game-report/negotiation-power-plan-game-report.component';
import { cultureReportComponent } from 'app/components/pdf/redSheet-full-pdf/culture-report/culture-report-component';
import { ourRelativePowerPositionReportComponent } from 'app/components/pdf/redSheet-full-pdf/our-relative-power-position-report/our-relative-power-position-report.component';
import { negotiablesPlanReportComponent } from 'app/components/pdf/redSheet-full-pdf/negotiables-plan-report/negotiables-plan-report-component';

@NgModule({
    imports: [PDF_ROUTING, CommonModule, RxTableModule, RxViewModule],
    declarations: [redSheetFullPdfComponent,backgroundReportComponent,negotiationEventReportComponent,theirTeamNegotiableReportComponent,
        preEventActionPlanningReportComponent,negotiationPowerPlanReportComponent,stakeholderEngagementReportComponent,
        ourTeamReportComponent,outcomesAndLearningReportComponent,postEventActionsAndImplementationsReportComponent,
        eventManagementAndTimelineReportComponent,negotiationPowerPlanGameReportComponent,cultureReportComponent,ourRelativePowerPositionReportComponent,negotiablesPlanReportComponent],
    providers: [PdfService],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PdfModule { }
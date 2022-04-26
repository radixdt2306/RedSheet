import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {CommonModule } from "@angular/common";
import {RouterModule } from '@angular/router';
import {RxTableModule } from "@rx/table";
import {RxViewModule } from "@rx/view";
import { redSheetLitePdfComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/redSheet-lite-pdf';
import { liteBackgroundReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/liteBackGround-report/liteBackGround-report.component';
import { thisNegotiationEventReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/this-negotiation-event-report/this-negotiation-event-report.component';
import { ourTeamAndOpponentReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/our-team-and-opponent-report/our-team-and-opponent-report.component';
import { negotiablesPlanLiteReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/negotiables-plan-lite-report/negotiables-plan-lite-report-component';
import { negotiationEventPlanReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/negotiation-event-plan-report/negotiation-event-plan-report.component';
import { ourRelativePowerPositionLiteReportComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/our-relative-power-position-lite-report/our-relative-power-position-lite-report.component';
import { LitePdfService } from 'app/components/redSheet-lite-report/redSheet-lite-report.service';
import { PDF_ROUTING } from 'app/components/redSheet-lite-report/redSheet-lite-report.routing';



@NgModule({
    imports: [PDF_ROUTING, CommonModule, RxTableModule, RxViewModule],
    declarations: [redSheetLitePdfComponent,liteBackgroundReportComponent,thisNegotiationEventReportComponent,ourTeamAndOpponentReportComponent,ourRelativePowerPositionLiteReportComponent,
        negotiablesPlanLiteReportComponent,negotiationEventPlanReportComponent ],
    providers: [LitePdfService],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LitePdfModule { }
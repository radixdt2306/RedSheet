import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {CommonModule } from "@angular/common";
import {RouterModule } from '@angular/router';
import {RxTableModule } from "@rx/table";
import {RxViewModule } from "@rx/view";
import { PDF_ROUTING } from 'app/components/redSheet-nano-report/redSheet-nano-report.routing';
import { redSheetNanoPdfComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/redSheet-nano-pdf';
import { nanoNegotationPlanReportComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-negotation-plan-report/nano-negotation-plan-report.component';
import { NanoPdfService } from 'app/components/redSheet-nano-report/redSheet-nano-report.service';
import { nanoAboutThisNegotiationEventComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-about-this-negotiation-event/nano-about-this-negotiation-event.component';
import { nanoOurRelativePowerPositionComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-our-relative-power-position/nano-our-relative-power-position.component';
import { nanoNegotiablesAndEventPlanComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/nano-negotiables-and-event-plan/nano-negotiables-and-event-plan.component';



@NgModule({
    imports: [PDF_ROUTING, CommonModule, RxTableModule, RxViewModule],
    declarations: [redSheetNanoPdfComponent,nanoNegotationPlanReportComponent,nanoAboutThisNegotiationEventComponent,nanoOurRelativePowerPositionComponent,nanoNegotiablesAndEventPlanComponent],
    providers: [NanoPdfService],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NanoPdfModule { }
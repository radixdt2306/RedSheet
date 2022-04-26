import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-negotiation-event-plan-report',
    templateUrl: './negotiation-event-plan-report.component.html',
})

export class negotiationEventPlanReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    eventAgendaTable :any;
    meetingManagementDetails:object;
    liteTargetData:any;
    eventPlanningActionTable:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.eventAgendaTable = this.liteReportData.negotiationEventPlanReport.eventAgendaTable;
        this.meetingManagementDetails = this.liteReportData.negotiationEventPlanReport.meetingManagementDetails;
        this.liteTargetData = this.liteReportData.negotiationEventPlanReport.liteTargetData;
        this.eventPlanningActionTable = this.liteReportData.negotiationEventPlanReport.eventPlanningActionTable;
        this.showComponent = true;
    }
   
    ngOnDestroy(): void {

    }
}

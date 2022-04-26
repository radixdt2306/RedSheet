import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-pre-event-action-planning-report',
    templateUrl: './pre-event-action-planning-report.component.html',
})

export class preEventActionPlanningReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    knowledgeGatheringPlanTableData :any;
    eventActionPlanningTableData:any;
    roomLayoutDetails:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.knowledgeGatheringPlanTableData = this.reportData.preEventActionPlanningReport["knowledgeGatheringPlanTable"];
        this.eventActionPlanningTableData = this.reportData.preEventActionPlanningReport["eventPlanningActionTable"];
        this.roomLayoutDetails = this.reportData.preEventActionPlanningReport["roomLayoutDetails"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

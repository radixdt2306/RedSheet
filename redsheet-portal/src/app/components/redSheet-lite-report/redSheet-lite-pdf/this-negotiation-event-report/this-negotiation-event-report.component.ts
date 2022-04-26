import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-this-negotiation-event-report',
    templateUrl: './this-negotiation-event-report.component.html',
})

export class thisNegotiationEventReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    thisNegotiationEventReportData :any;
    knowledgeGatheringTableData:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.thisNegotiationEventReportData = this.liteReportData.aboutThisNegotiationEventReport.negotiationEventData;
        this.knowledgeGatheringTableData = this.liteReportData.aboutThisNegotiationEventReport.knowledgeGatheringPlanData;
            this.thisNegotiationEventReportData["modeName"] = [];
            this.thisNegotiationEventReportData["iconClass"] = [];
            for(var i : number =0 ;i<this.thisNegotiationEventReportData.communicationModeName.split(',').length;i++)
            {
                this.thisNegotiationEventReportData["modeName"].push(this.thisNegotiationEventReportData.communicationModeName.split(',')[i]);
                this.thisNegotiationEventReportData["iconClass"].push(this.thisNegotiationEventReportData.communicationModeClassName.split(',')[i]);
            }
        this.showComponent = true;
    }

    ngOnDestroy(): void {
        
    }
}

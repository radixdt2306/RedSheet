import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-nano-about-this-negotiation-event',
    templateUrl: './nano-about-this-negotiation-event.component.html',
})
export class nanoAboutThisNegotiationEventComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() nanoReportData: any;
    aboutThisNegotiationEventdata: any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.aboutThisNegotiationEventdata = this.nanoReportData.aboutThisNegotiationEventReport;
        this.aboutThisNegotiationEventdata.negotiationEventData["modeName"] = [];
        this.aboutThisNegotiationEventdata.negotiationEventData["iconClass"] = [];
        for(var i : number =0 ;i<this.aboutThisNegotiationEventdata.negotiationEventData.communicationModeName.split(',').length;i++)
        {
            this.aboutThisNegotiationEventdata.negotiationEventData["modeName"].push(this.aboutThisNegotiationEventdata.negotiationEventData.communicationModeName.split(',')[i]);
            this.aboutThisNegotiationEventdata.negotiationEventData["iconClass"].push(this.aboutThisNegotiationEventdata.negotiationEventData.communicationModeClassName.split(',')[i]);
        }
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

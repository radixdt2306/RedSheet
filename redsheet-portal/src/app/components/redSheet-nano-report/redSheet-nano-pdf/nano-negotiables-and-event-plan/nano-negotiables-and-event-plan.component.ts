import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-nano-negotiables-and-event-plan',
    templateUrl: './nano-negotiables-and-event-plan.component.html',
})
export class nanoNegotiablesAndEventPlanComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() nanoReportData: any;
    negotiablesAndEventPlanReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.negotiablesAndEventPlanReportData = this.nanoReportData.negotiablesAndEventPlan;
        this.showComponent = true;
    }
    
    ngOnDestroy(): void {

    }
}

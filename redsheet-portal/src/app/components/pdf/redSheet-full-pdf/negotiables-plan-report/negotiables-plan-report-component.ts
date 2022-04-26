import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-negotiables-plan-report',
    templateUrl: './negotiables-plan-report-component.html',
})
export class negotiablesPlanReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    negotiablePlanData :any;
    requirementReport:object;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.negotiablePlanData = this.reportData.negotiablePlan;
        if(this.reportData.negotiablePlan['requirementReportData'] != "")
        {
        this.requirementReport = JSON.parse(this.reportData.negotiablePlan['requirementReportData']);
        }
        else{
            this.requirementReport = null;
        }
        this.showComponent = true;
    }
   
    ngOnDestroy(): void {

    }
}

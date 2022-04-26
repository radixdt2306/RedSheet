import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-negotiables-plan-lite-report',
    templateUrl: './negotiables-plan-lite-report-component.html',
})
export class negotiablesPlanLiteReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    negotiablePlanData :any;
    requirementReport:object;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.negotiablePlanData = this.liteReportData.negotiablePlan;
        if(this.liteReportData.negotiablePlan['requirementReportData'] != "")
        {
        this.requirementReport = JSON.parse(this.liteReportData.negotiablePlan['requirementReportData']);
        }
        else{
            this.requirementReport = null;
        }
        this.showComponent = true;
    }
   
    ngOnDestroy(): void {

    }
}

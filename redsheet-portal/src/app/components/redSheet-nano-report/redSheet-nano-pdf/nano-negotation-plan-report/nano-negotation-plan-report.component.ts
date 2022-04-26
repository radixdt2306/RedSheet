import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-nano-negotation-plan-report',
    templateUrl: './nano-negotation-plan-report.component.html',
})
export class nanoNegotationPlanReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() nanoReportData: any;
    nanoNegotationPlanReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.nanoNegotationPlanReportData = this.nanoReportData.backGroundReport;
        this.showComponent = true;
    }
    
    ngOnDestroy(): void {

    }
}

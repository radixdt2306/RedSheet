import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-liteBackground-report',
    templateUrl: './liteBackground-report.component.html',
})
export class liteBackgroundReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    liteBackgroundReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.liteBackgroundReportData = this.liteReportData.liteBackGroundReport;
        this.showComponent = true;
    }
    
    ngOnDestroy(): void {

    }
}

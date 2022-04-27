import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-culture-report',
    templateUrl: './culture-report-component.html',
})
export class cultureReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    cultureReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.cultureReportData = this.reportData.cultureReport;
        this.showComponent = true;
    }
    ngOnDestroy(): void {

    }
}

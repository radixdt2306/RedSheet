import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-background-report',
    templateUrl: './background-report.component.html',
})
export class backgroundReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    backgroundReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.backgroundReportData = this.reportData.backGroundReport;
        this.showComponent = true;
    }
    
    ngOnDestroy(): void {

    }
}

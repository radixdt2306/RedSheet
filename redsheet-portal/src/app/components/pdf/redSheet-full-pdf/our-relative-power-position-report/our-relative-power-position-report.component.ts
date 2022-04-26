import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-our-relative-power-position-report',
    templateUrl: './our-relative-power-position-report.component.html',
})
export class ourRelativePowerPositionReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    dependencyReportData :any;
    marketReportData:any;
    relationshipReportData:any;
    timeReportData:any;
    futureOpportunityReportData:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.dependencyReportData = this.reportData.ourRelativePowerPositionReport["dependencyReport"];
        this.marketReportData = this.reportData.ourRelativePowerPositionReport["marketReport"];
        this.relationshipReportData = this.reportData.ourRelativePowerPositionReport["relationshipReport"];
        this.timeReportData = this.reportData.ourRelativePowerPositionReport["timeReport"];
        this.futureOpportunityReportData = this.reportData.ourRelativePowerPositionReport["futureOpportunityReport"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

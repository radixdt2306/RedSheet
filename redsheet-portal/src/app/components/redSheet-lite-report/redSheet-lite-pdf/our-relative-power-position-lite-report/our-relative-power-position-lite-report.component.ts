import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-our-relative-power-position-lite-report',
    templateUrl: './our-relative-power-position-lite-report.component.html',
})
export class ourRelativePowerPositionLiteReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    dependencyReportData :any;
    marketReportData:any;
    relationshipReportData:any;
    timeReportData:any;
    futureOpportunityReportData:any;
    projectPowerDetails:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.dependencyReportData = this.liteReportData.ourRelativePowerPositionReport["dependencyReport"];
        this.marketReportData = this.liteReportData.ourRelativePowerPositionReport["marketReport"];
        this.relationshipReportData = this.liteReportData.ourRelativePowerPositionReport["relationshipReport"];
        this.timeReportData = this.liteReportData.ourRelativePowerPositionReport["timeReport"];
        this.futureOpportunityReportData = this.liteReportData.ourRelativePowerPositionReport["futureOpportunityReport"];
        this.projectPowerDetails = this.liteReportData.ourRelativePowerPositionReport["projectPowerDetails"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

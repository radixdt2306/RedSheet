import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-nano-our-relative-power-position',
    templateUrl: './nano-our-relative-power-position.component.html',
})
export class nanoOurRelativePowerPositionComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() nanoReportData: any;
    dependencyReportData :any;
    marketReportData:any;
    relationshipReportData:any;
    timeReportData:any;
    futureOpportunityReportData:any;
    powerReportData:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.powerReportData =this.nanoReportData.ourRelativePowerPositionReport.powerData;
        this.dependencyReportData = this.nanoReportData.ourRelativePowerPositionReport["dependencyReport"];
        this.marketReportData = this.nanoReportData.ourRelativePowerPositionReport["marketReport"];
        this.relationshipReportData = this.nanoReportData.ourRelativePowerPositionReport["relationshipReport"];
        this.timeReportData = this.nanoReportData.ourRelativePowerPositionReport["timeReport"];
        this.futureOpportunityReportData = this.nanoReportData.ourRelativePowerPositionReport["futureOpportunityReport"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

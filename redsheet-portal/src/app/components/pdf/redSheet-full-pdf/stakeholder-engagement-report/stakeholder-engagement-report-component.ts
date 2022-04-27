import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-stakeholder-engagement-report',
    templateUrl: './stakeholder-engagement-report-component.html',
})
export class stakeholderEngagementReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    stakeholderReportData: any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.stakeholderReportData = this.reportData.stakeholderEngagementReport;
        if(this.stakeholderReportData.stakeholderReportData != null)
        {
            for (var j: number = 0; j < this.stakeholderReportData.stakeholderReportData.length; j++) {
                this.stakeholderReportData.stakeholderReportData[j]["modeName"] = [];
                this.stakeholderReportData.stakeholderReportData[j]["iconClass"] = [];
                for (var i: number = 0; i < this.stakeholderReportData.stakeholderReportData[j].communicationModeName.split(',').length; i++) {
                    this.stakeholderReportData.stakeholderReportData[j]["modeName"].push(this.stakeholderReportData.stakeholderReportData[j].communicationModeName.split(',')[i]);
                    this.stakeholderReportData.stakeholderReportData[j]["iconClass"].push(this.stakeholderReportData.stakeholderReportData[j].communicationModeClassName.split(',')[i]);
                }
            }
        }
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

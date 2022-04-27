import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-our-team-report-component',
    templateUrl: './our-team-report-component.html',
})
export class ourTeamReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    ourTeamReportData :any;
    assertivenessData:any;
    conflictStyleData:any;
    emotionalCompetenceData:any;

    constructor(
    ) {

    }

    ngOnInit(): void {
            this.ourTeamReportData = this.reportData.ourTeamReport;
            this.assertivenessData =this.reportData.ourTeamReportWhenTableIsEmpty.assertiveness;
            this.conflictStyleData =this.reportData.ourTeamReportWhenTableIsEmpty.conflictStyle;
            this.emotionalCompetenceData =this.reportData.ourTeamReportWhenTableIsEmpty.emotionalCompetence;
            this.showComponent = true;
    }

    ngOnDestroy(): void {
        
    }
}

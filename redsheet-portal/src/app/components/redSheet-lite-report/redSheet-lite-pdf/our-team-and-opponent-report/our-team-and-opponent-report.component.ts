import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-our-team-and-opponent-report',
    templateUrl: './our-team-and-opponent-report.component.html',
})

export class ourTeamAndOpponentReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() liteReportData: any;
    theirTeamTableData :any;
    theirTeamknownData : any;
    ourTeamTableData : any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.theirTeamTableData = this.liteReportData.ourTeamAndOpponentsReport["theirTeamTable"];
        this.ourTeamTableData = this.liteReportData.ourTeamAndOpponentsReport["ourTeamTable"];
        this.theirTeamknownData = this.liteReportData.ourTeamAndOpponentsReport["knowAboutThemDetails"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

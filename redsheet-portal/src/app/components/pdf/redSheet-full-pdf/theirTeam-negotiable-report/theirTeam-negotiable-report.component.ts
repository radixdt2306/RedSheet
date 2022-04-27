import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-theirTeam-negotiable-report',
    templateUrl: './theirTeam-negotiable-report.component.html',
})

export class theirTeamNegotiableReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    theirTeamNegotiableReportTableData :any;
    theirTeamknownData : any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.theirTeamNegotiableReportTableData = this.reportData.theirTeamNegotiableReport["theirTeamTable"];
        this.theirTeamknownData = this.reportData.theirTeamNegotiableReport["knowAbutThemDetails"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

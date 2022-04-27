import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';


declare var d3: any;
@Component({
    selector: 'app-negotiation-event-report',
    templateUrl: './negotiation-event-report-component.html',
})
export class negotiationEventReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    thisNegotiationEventReportData: any;
    eventsMilestonesAndDesiredOutcomesWithTableData: any;
    chartIdValue: string = 'eventsMilestonesAndDesiredOutcomesChart';
    tableData: any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.thisNegotiationEventReportData = this.reportData.negotiationEvent.thisNegotiationEventReport;
        this.eventsMilestonesAndDesiredOutcomesWithTableData = this.reportData.negotiationEvent.eventsMilestonesAndDesiredOutcomesWithTable;
        this.tableData = this.reportData.negotiationEvent.eventsMilestonesAndDesiredOutcomesWithTableBind;
        this.thisNegotiationEventReportData["modeName"] = [];
        this.thisNegotiationEventReportData["iconClass"] = [];
        for (var i: number = 0; i < this.thisNegotiationEventReportData.communicationModeName.split(',').length; i++) {
            this.thisNegotiationEventReportData["modeName"].push(this.thisNegotiationEventReportData.communicationModeName.split(',')[i]);
            this.thisNegotiationEventReportData["iconClass"].push(this.thisNegotiationEventReportData.communicationModeClassName.split(',')[i]);
        }
        if (this.eventsMilestonesAndDesiredOutcomesWithTableData != null) {
            //For Chart Related code....
            var taskNames = [];
            var tasks = [];
            var taskStatus = {
                "SUCCEEDED": "bar",
                "FAILED": "bar-failed",
                "RUNNING": "bar-running",
                "KILLED": "bar-killed"
            };

            for (var i = 0; i < this.eventsMilestonesAndDesiredOutcomesWithTableData.length; i++) {
                taskNames.push(this.eventsMilestonesAndDesiredOutcomesWithTableData[i].taskName);
                this.eventsMilestonesAndDesiredOutcomesWithTableData[i].startDate = new Date(this.eventsMilestonesAndDesiredOutcomesWithTableData[i].startDate);
                this.eventsMilestonesAndDesiredOutcomesWithTableData[i].endDate = new Date(this.eventsMilestonesAndDesiredOutcomesWithTableData[i].endDate);
                tasks.push(this.eventsMilestonesAndDesiredOutcomesWithTableData[i]);
            }

            tasks.sort(function (a, b) {
                return a.endDate - b.endDate;
            });
            var maxDate = tasks[tasks.length - 1].endDate;
            tasks.sort(function (a, b) {
                return a.startDate - b.startDate;
            });
            var minDate = tasks[0].startDate;
            var format = "%d-%m-%y";
            var gantt = d3.gantt(this.chartIdValue, this.eventsMilestonesAndDesiredOutcomesWithTableData[0].noOfeventsMilestonesCount,minDate,maxDate).taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
            gantt(tasks);

        }
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

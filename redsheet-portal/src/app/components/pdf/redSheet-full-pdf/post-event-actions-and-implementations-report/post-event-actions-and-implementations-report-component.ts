import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

declare var d3: any;
@Component({
    selector: 'app-post-event-actions-and-implementations-report',
    templateUrl: './post-event-actions-and-implementations-report-component.html',
})


export class postEventActionsAndImplementationsReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    postEventActionsAndImplementationsData :any;
    implementationPlanReportData:any;
    chartIdValue : string ='implementationPlanChart';
    tableData: any;
    constructor(
    ) {

    }

    ngOnInit(): void {
            this.postEventActionsAndImplementationsData = this.reportData.postEventActionsAndImplementations;
            this.implementationPlanReportData = this.reportData.postEventActionsAndImplementations.implementationPlanReport;
            this.tableData = this.reportData.postEventActionsAndImplementations.implementationPlanReportTableBind;
            //For Chart Related code....
            if(this.implementationPlanReportData != null)
            {
                var taskNames = [];
                var tasks = [];
                var taskStatus = {
                    "SUCCEEDED": "bar",
                    "FAILED": "bar-failed",
                    "RUNNING": "bar-running",
                    "KILLED": "bar-killed"
                };
        
                for (var i = 0; i < this.implementationPlanReportData.length; i++) {
                    taskNames.push(this.implementationPlanReportData[i].taskName);
                    this.implementationPlanReportData[i].startDate = new Date(this.implementationPlanReportData[i].startDate);
                    this.implementationPlanReportData[i].endDate = new Date(this.implementationPlanReportData[i].endDate);
                    tasks.push(this.implementationPlanReportData[i]);
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
                var gantt = d3.gantt(this.chartIdValue,this.implementationPlanReportData[0].noOfeventsMilestonesCount,minDate,maxDate).taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
                gantt(tasks);
            }
            this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

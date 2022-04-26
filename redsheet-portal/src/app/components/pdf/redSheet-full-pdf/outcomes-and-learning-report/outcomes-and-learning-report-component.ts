import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-outcomes-and-learning-report',
    templateUrl: './outcomes-and-learning-report-component.html',
})
export class outcomesAndLearningReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    outcomesAndLearningReportData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.outcomesAndLearningReportData = this.reportData.outcomeAndLearningReport;
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-event-management-and-timeline-report',
    templateUrl: './event-management-and-timeline-report-component.html',
})
export class eventManagementAndTimelineReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    eventManagementAndTimelineData :any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.eventManagementAndTimelineData = this.reportData.eventManagementAndTimeline;
        this.showComponent = true;
    }
  
    ngOnDestroy(): void {

    }
}

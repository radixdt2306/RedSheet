import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';

@Component({
    selector: 'app-negotiation-power-plan-report',
    templateUrl: './negotiation-power-plan-report.component.html',
})
export class negotiationPowerPlanReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    valueObjectiveData :any;
    targetData :any;
    longTermObjectiveData :any;
    projectPowerData :any;
    negotiatingData:any;

    constructor(
    ) {

    }

    ngOnInit(): void {
        this.valueObjectiveData = this.reportData.negotiationPowerPlanReport["valueObjectiveData"];
        this.targetData = this.reportData.negotiationPowerPlanReport["targetData"];
        this.longTermObjectiveData = this.reportData.negotiationPowerPlanReport["longTermObjectiveData"];
        this.projectPowerData = this.reportData.negotiationPowerPlanReport["projectPowerData"];
        this.negotiatingData = this.reportData.negotiationPowerPlanReport["negotiatingDetail"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

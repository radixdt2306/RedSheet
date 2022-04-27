import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';
import { GAME_TYPES } from 'app/database-collections/game-type';
import { GameTypeEnum } from 'app/enums/game-type';

@Component({
    selector: 'app-negotiation-power-plan-game-report',
    templateUrl: './negotiation-power-plan-game-report.component.html',
})

export class negotiationPowerPlanGameReportComponent implements OnInit, OnDestroy {
    showComponent: boolean = false;
    @Input() projectId: number;
    @Input() reportData: any;
    gameTableDetails: any;
    gameStrategyDetail: any;
    gameTypeEnum:any;
    constructor(
    ) {

    }

    ngOnInit(): void {
        this.gameTypeEnum = GameTypeEnum;
        this.gameTableDetails = this.reportData.negotiationPowerPlanGameReport["gameTableDetails"];
        this.gameStrategyDetail = this.reportData.negotiationPowerPlanGameReport["gameStrategyDetail"];
        this.showComponent = true;
    }

    ngOnDestroy(): void {

    }
}

import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ArrivalAndOpeningTacticListComponent } from './list/arrival-and-opening-tactic-list.component'
import {ArrivalAndOpeningTacticsService } from "./arrival-and-opening-tactics.service";
import {ARRIVAL_AND_OPENING_TACTICS_SHARED_COMPONENT_CONTAINER } from './arrival-and-opening-tactics-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ArrivalAndOpeningTacticListComponent, ],
    providers: [ArrivalAndOpeningTacticsService ],
    exports: [RouterModule, ArrivalAndOpeningTacticListComponent, ]
})
export class ArrivalAndOpeningTacticsSharedComponentModule { }
DynamicComponentContainer.register(ARRIVAL_AND_OPENING_TACTICS_SHARED_COMPONENT_CONTAINER );
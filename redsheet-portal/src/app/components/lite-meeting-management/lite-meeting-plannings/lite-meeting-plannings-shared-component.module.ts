import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteMeetingPlanningListComponent } from './list/lite-meeting-planning-list.component'
import {LiteMeetingPlanningsService } from "./lite-meeting-plannings.service";
import {LITE_MEETING_PLANNINGS_SHARED_COMPONENT_CONTAINER } from './lite-meeting-plannings-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteMeetingPlanningListComponent, ],
    providers: [LiteMeetingPlanningsService ],
    exports: [RouterModule, LiteMeetingPlanningListComponent, ]
})
export class LiteMeetingPlanningsSharedComponentModule { }
DynamicComponentContainer.register(LITE_MEETING_PLANNINGS_SHARED_COMPONENT_CONTAINER );
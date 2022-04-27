import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteEventPlanningActionListComponent } from './list/lite-event-planning-action-list.component'
import { LiteEventPlanningActionAddComponent } from './add/lite-event-planning-action-add.component'
import { LiteEventPlanningActionEditComponent } from './edit/lite-event-planning-action-edit.component'
import {LiteEventPlanningActionsService } from "./lite-event-planning-actions.service";
import {LITE_EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER } from './lite-event-planning-actions-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteEventPlanningActionListComponent,  LiteEventPlanningActionAddComponent,  LiteEventPlanningActionEditComponent, ],
    providers: [LiteEventPlanningActionsService ],
    exports: [RouterModule, LiteEventPlanningActionListComponent,  LiteEventPlanningActionAddComponent,  LiteEventPlanningActionEditComponent, ]
})
export class LiteEventPlanningActionsSharedComponentModule { }
DynamicComponentContainer.register(LITE_EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER );
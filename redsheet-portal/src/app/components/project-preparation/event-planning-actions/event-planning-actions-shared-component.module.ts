import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { EventPlanningActionListComponent } from './list/event-planning-action-list.component'
import { EventPlanningActionAddComponent } from './add/event-planning-action-add.component'
import { EventPlanningActionEditComponent } from './edit/event-planning-action-edit.component'
import {EventPlanningActionsService } from "./event-planning-actions.service";
import {EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER } from './event-planning-actions-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ EventPlanningActionListComponent,  EventPlanningActionAddComponent,  EventPlanningActionEditComponent, ],
    providers: [EventPlanningActionsService ],
    exports: [RouterModule, EventPlanningActionListComponent,  EventPlanningActionAddComponent,  EventPlanningActionEditComponent, ]
})
export class EventPlanningActionsSharedComponentModule { }
DynamicComponentContainer.register(EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER );
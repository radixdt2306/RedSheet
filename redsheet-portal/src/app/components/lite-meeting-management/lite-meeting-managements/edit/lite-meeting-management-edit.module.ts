import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxFormsModule} from "@rx/forms";
import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { LiteMeetingManagementEditComponent } from './lite-meeting-management-edit.component'
import { LITE_MEETING_MANAGEMENT_EDIT_ROUTING } from './lite-meeting-management-edit.routing'
import {LiteMeetingManagementsService } from "../lite-meeting-managements.service";
import { LiteMeetingPlanningsSharedComponentModule } from 'app/components/lite-meeting-management/lite-meeting-plannings/lite-meeting-plannings-shared-component.module'
import { LiteMeetingManagementTimingsSharedComponentModule } from 'app/components/lite-meeting-management/lite-meeting-management-timings/lite-meeting-management-timings-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { LiteEventPlanningActionsSharedComponentModule } from 'app/components/lite-meeting-management/lite-event-planning-actions/lite-event-planning-actions-shared-component.module'

@NgModule({
    imports: [
        LITE_MEETING_MANAGEMENT_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule, RxFormsModule, FormsModule, ReactiveFormsModule,
		LiteMeetingPlanningsSharedComponentModule, LiteMeetingManagementTimingsSharedComponentModule, ProjectModulesSharedComponentModule,  LiteEventPlanningActionsSharedComponentModule   ],
    declarations: [LiteMeetingManagementEditComponent ],
    exports: [RouterModule],
    providers: [LiteMeetingManagementsService]
})
export class LiteMeetingManagementEditModule { }
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteMeetingManagementTimingListComponent } from './list/lite-meeting-management-timing-list.component'
import { LiteMeetingManagementTimingAddComponent } from './add/lite-meeting-management-timing-add.component'
import { LiteMeetingManagementTimingEditComponent } from './edit/lite-meeting-management-timing-edit.component'
import {LiteMeetingManagementTimingsService } from "./lite-meeting-management-timings.service";
import {LITE_MEETING_MANAGEMENT_TIMINGS_SHARED_COMPONENT_CONTAINER } from './lite-meeting-management-timings-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteMeetingManagementTimingListComponent,  LiteMeetingManagementTimingAddComponent,  LiteMeetingManagementTimingEditComponent, ],
    providers: [LiteMeetingManagementTimingsService ],
    exports: [RouterModule, LiteMeetingManagementTimingListComponent,  LiteMeetingManagementTimingAddComponent,  LiteMeetingManagementTimingEditComponent, ]
})
export class LiteMeetingManagementTimingsSharedComponentModule { }
DynamicComponentContainer.register(LITE_MEETING_MANAGEMENT_TIMINGS_SHARED_COMPONENT_CONTAINER );
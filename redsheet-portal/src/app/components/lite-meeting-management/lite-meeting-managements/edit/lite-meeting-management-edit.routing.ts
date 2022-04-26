import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LiteMeetingManagementEditComponent } from './lite-meeting-management-edit.component'

const LITE_MEETING_MANAGEMENT_EDIT_ROUTES: Routes = [{
    path: '', component: LiteMeetingManagementEditComponent
}];

export const LITE_MEETING_MANAGEMENT_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(LITE_MEETING_MANAGEMENT_EDIT_ROUTES);
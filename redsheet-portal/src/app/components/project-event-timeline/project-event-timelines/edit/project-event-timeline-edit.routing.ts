import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectEventTimelineEditComponent } from './project-event-timeline-edit.component'

const PROJECT_EVENT_TIMELINE_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectEventTimelineEditComponent
}];

export const PROJECT_EVENT_TIMELINE_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_EVENT_TIMELINE_EDIT_ROUTES);
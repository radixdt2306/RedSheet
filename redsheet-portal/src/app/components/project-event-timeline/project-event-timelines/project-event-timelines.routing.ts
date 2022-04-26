import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_EVENT_TIMELINES_ROUTES: Routes = [
	{
    path: ':projectEventTimelineId', 
	loadChildren: './edit/project-event-timeline-edit.module#ProjectEventTimelineEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5096, accessItem: 'edit', keyName: 'projectEventTimelineId' }
	},
];

export const PROJECT_EVENT_TIMELINES_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_EVENT_TIMELINES_ROUTES);

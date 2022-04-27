import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_EVENT_TIMELINE_ROUTES: Routes = [
    {
        path: 'project-event-timelines',
        loadChildren: './project-event-timelines/project-event-timelines.module#ProjectEventTimelinesModule'
    },
//route paths
];

export const PROJECT_EVENT_TIMELINE_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_EVENT_TIMELINE_ROUTES);

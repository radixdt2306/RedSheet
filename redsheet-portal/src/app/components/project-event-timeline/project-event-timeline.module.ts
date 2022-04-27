import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_EVENT_TIMELINE_ROUTING } from './project-event-timeline.routing';

@NgModule({
    imports: [PROJECT_EVENT_TIMELINE_ROUTING],
    exports: [RouterModule]
})
export class ProjectEventTimelineModule { }

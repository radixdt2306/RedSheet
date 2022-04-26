import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_EVENT_TIMELINES_ROUTING } from './project-event-timelines.routing';
import { ProjectEventTimelinesService } from './project-event-timelines.service';

@NgModule({
    imports: [PROJECT_EVENT_TIMELINES_ROUTING],
    exports: [RouterModule],
    providers: [ProjectEventTimelinesService]
})
export class ProjectEventTimelinesModule { }
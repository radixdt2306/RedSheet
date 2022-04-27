import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectEventTimelineEditComponent } from './project-event-timeline-edit.component'
import { PROJECT_EVENT_TIMELINE_EDIT_ROUTING } from './project-event-timeline-edit.routing'
import {ProjectEventTimelinesService } from "../project-event-timelines.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { ArrivalAndOpeningTacticsSharedComponentModule } from 'app/components/project-event-timeline/arrival-and-opening-tactics/arrival-and-opening-tactics-shared-component.module'
import { EventAgendaTimingsSharedComponentModule } from 'app/components/project-event-timeline/event-agenda-timings/event-agenda-timings-shared-component.module'

import { RxFormsModule } from '@rx/forms'

@NgModule({
    imports: [
        PROJECT_EVENT_TIMELINE_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule,
		ProjectModulesSharedComponentModule, ArrivalAndOpeningTacticsSharedComponentModule, EventAgendaTimingsSharedComponentModule,     ],
    declarations: [ProjectEventTimelineEditComponent ],
    exports: [RouterModule],
    providers: [ProjectEventTimelinesService]
})
export class ProjectEventTimelineEditModule { }
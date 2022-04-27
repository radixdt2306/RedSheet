import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { EventAgendaTimingListComponent } from './list/event-agenda-timing-list.component'
import { EventAgendaTimingAddComponent } from './add/event-agenda-timing-add.component'
import { EventAgendaTimingEditComponent } from './edit/event-agenda-timing-edit.component'
import {EventAgendaTimingsService } from "./event-agenda-timings.service";
import {EVENT_AGENDA_TIMINGS_SHARED_COMPONENT_CONTAINER } from './event-agenda-timings-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ EventAgendaTimingListComponent,  EventAgendaTimingAddComponent,  EventAgendaTimingEditComponent, ],
    providers: [EventAgendaTimingsService ],
    exports: [RouterModule, EventAgendaTimingListComponent,  EventAgendaTimingAddComponent,  EventAgendaTimingEditComponent, ]
})
export class EventAgendaTimingsSharedComponentModule { }
DynamicComponentContainer.register(EVENT_AGENDA_TIMINGS_SHARED_COMPONENT_CONTAINER );
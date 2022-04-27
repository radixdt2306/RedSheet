import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { BackgroundEventListComponent } from './list/background-event-list.component'
import { BackgroundEventAddComponent } from './add/background-event-add.component'
import { BackgroundEventEditComponent } from './edit/background-event-edit.component'
import {BackgroundEventsService } from "./background-events.service";
import {BACKGROUND_EVENTS_SHARED_COMPONENT_CONTAINER } from './background-events-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ BackgroundEventListComponent,  BackgroundEventAddComponent,  BackgroundEventEditComponent, ],
    providers: [BackgroundEventsService ],
    exports: [RouterModule, BackgroundEventListComponent,  BackgroundEventAddComponent,  BackgroundEventEditComponent, ]
})
export class BackgroundEventsSharedComponentModule { }
DynamicComponentContainer.register(BACKGROUND_EVENTS_SHARED_COMPONENT_CONTAINER );
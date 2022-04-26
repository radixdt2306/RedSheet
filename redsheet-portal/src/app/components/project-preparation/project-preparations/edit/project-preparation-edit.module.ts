import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectPreparationEditComponent } from './project-preparation-edit.component'
import { PROJECT_PREPARATION_EDIT_ROUTING } from './project-preparation-edit.routing'
import {ProjectPreparationsService } from "../project-preparations.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { EventPlanningActionsSharedComponentModule } from 'app/components/project-preparation/event-planning-actions/event-planning-actions-shared-component.module'
import { CommunicationPlansSharedComponentModule } from 'app/components/project-preparation/communication-plans/communication-plans-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_PREPARATION_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule, EventPlanningActionsSharedComponentModule, CommunicationPlansSharedComponentModule,RxFormsModule,     ],
    declarations: [ProjectPreparationEditComponent ],
    exports: [RouterModule],
    providers: [ProjectPreparationsService]
})
export class ProjectPreparationEditModule { }
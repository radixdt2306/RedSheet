import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectBackgroundEditComponent } from './project-background-edit.component'
import { PROJECT_BACKGROUND_EDIT_ROUTING } from './project-background-edit.routing'
import {ProjectBackgroundsService } from "../project-backgrounds.service";
import { BackgroundEventsSharedComponentModule } from 'app/components/project-background/background-events/background-events-shared-component.module'
import { LongTermObjectivesSharedComponentModule } from 'app/components/project-background/long-term-objectives/long-term-objectives-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_BACKGROUND_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule,
		BackgroundEventsSharedComponentModule, LongTermObjectivesSharedComponentModule, ProjectModulesSharedComponentModule,     ],
    declarations: [ProjectBackgroundEditComponent ],
    exports: [RouterModule],
    providers: [ProjectBackgroundsService]
})
export class ProjectBackgroundEditModule { }
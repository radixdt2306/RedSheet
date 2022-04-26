import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectOutcomeAndLearningEditComponent } from './project-outcome-and-learning-edit.component'
import { PROJECT_OUTCOME_AND_LEARNING_EDIT_ROUTING } from './project-outcome-and-learning-edit.routing'
import {ProjectOutcomeAndLearningsService } from "../project-outcome-and-learnings.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_OUTCOME_AND_LEARNING_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule,RxFormsModule,     ],
    declarations: [ProjectOutcomeAndLearningEditComponent ],
    exports: [RouterModule],
    providers: [ProjectOutcomeAndLearningsService]
})
export class ProjectOutcomeAndLearningEditModule { }
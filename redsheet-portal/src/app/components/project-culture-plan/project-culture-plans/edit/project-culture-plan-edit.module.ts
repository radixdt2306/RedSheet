import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectCulturePlanEditComponent } from './project-culture-plan-edit.component'
import { PROJECT_CULTURE_PLAN_EDIT_ROUTING } from './project-culture-plan-edit.routing'
import {ProjectCulturePlansService } from "../project-culture-plans.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_CULTURE_PLAN_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule, RxFormsModule,    ],
    declarations: [ProjectCulturePlanEditComponent ],
    exports: [RouterModule],
    providers: [ProjectCulturePlansService]
})
export class ProjectCulturePlanEditModule { }
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectImplementationPlanListComponent } from './list/project-implementation-plan-list.component'
import { ProjectImplementationPlanAddComponent } from './add/project-implementation-plan-add.component'
import { ProjectImplementationPlanEditComponent } from './edit/project-implementation-plan-edit.component'
import {ProjectImplementationPlansService } from "./project-implementation-plans.service";
import {PROJECT_IMPLEMENTATION_PLANS_SHARED_COMPONENT_CONTAINER } from './project-implementation-plans-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectImplementationPlanListComponent,  ProjectImplementationPlanAddComponent,  ProjectImplementationPlanEditComponent, ],
    providers: [ProjectImplementationPlansService ],
    exports: [RouterModule, ProjectImplementationPlanListComponent,  ProjectImplementationPlanAddComponent,  ProjectImplementationPlanEditComponent, ]
})
export class ProjectImplementationPlansSharedComponentModule { }
//Needs to uncomment in future -RUCHI
//DynamicComponentContainer.register(PROJECT_IMPLEMENTATION_PLANS_SHARED_COMPONENT_CONTAINER );
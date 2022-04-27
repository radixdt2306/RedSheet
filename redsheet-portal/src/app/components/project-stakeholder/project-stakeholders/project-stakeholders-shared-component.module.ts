import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectStakeholderAddComponent } from './add/project-stakeholder-add.component'
import { ProjectStakeholderEditComponent } from './edit/project-stakeholder-edit.component'
import {ProjectStakeholdersService } from "./project-stakeholders.service";
import {PROJECT_STAKEHOLDERS_SHARED_COMPONENT_CONTAINER } from './project-stakeholders-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectStakeholderAddComponent,  ProjectStakeholderEditComponent, ],
    providers: [ProjectStakeholdersService ],
    exports: [RouterModule, ProjectStakeholderAddComponent,  ProjectStakeholderEditComponent, ]
})
export class ProjectStakeholdersSharedComponentModule { }
DynamicComponentContainer.register(PROJECT_STAKEHOLDERS_SHARED_COMPONENT_CONTAINER );
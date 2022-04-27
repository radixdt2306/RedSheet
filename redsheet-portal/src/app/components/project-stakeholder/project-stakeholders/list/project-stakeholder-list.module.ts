import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectStakeholderListComponent } from './project-stakeholder-list.component'
import { PROJECT_STAKEHOLDER_LIST_ROUTING } from './project-stakeholder-list.routing'
import {ProjectStakeholdersService } from "../project-stakeholders.service";
import { ProjectStakeholdersSharedComponentModule } from 'app/components/project-stakeholder/project-stakeholders/project-stakeholders-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'

@NgModule({
    imports: [
        PROJECT_STAKEHOLDER_LIST_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectStakeholdersSharedComponentModule, ProjectModulesSharedComponentModule,     ],
    declarations: [ProjectStakeholderListComponent ],
    exports: [RouterModule],
    providers: [ProjectStakeholdersService]
})
export class ProjectStakeholderListModule { }
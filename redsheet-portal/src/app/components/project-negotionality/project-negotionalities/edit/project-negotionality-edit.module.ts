import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectNegotionalityEditComponent } from './project-negotionality-edit.component'
import { PROJECT_NEGOTIONALITY_EDIT_ROUTING } from './project-negotionality-edit.routing'
import {ProjectNegotionalitiesService } from "../project-negotionalities.service";
import { OurTeamMembersSharedComponentModule } from 'app/components/project-negotionality/our-team-members/our-team-members-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_NEGOTIONALITY_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule,
		OurTeamMembersSharedComponentModule, ProjectModulesSharedComponentModule,     ],
    declarations: [ProjectNegotionalityEditComponent ],
    exports: [RouterModule],
    providers: [ProjectNegotionalitiesService]
})
export class ProjectNegotionalityEditModule { }
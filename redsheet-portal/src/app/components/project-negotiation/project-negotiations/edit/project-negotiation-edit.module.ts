import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectNegotiationEditComponent } from './project-negotiation-edit.component'
import { PROJECT_NEGOTIATION_EDIT_ROUTING } from './project-negotiation-edit.routing'
import {ProjectNegotiationsService } from "../project-negotiations.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { TheirTeamMembersSharedComponentModule } from 'app/components/project-negotiation/their-team-members/their-team-members-shared-component.module'
import { TargetsSharedComponentModule } from 'app/components/project-negotiation/targets/targets-shared-component.module'

import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_NEGOTIATION_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule,
		ProjectModulesSharedComponentModule, TheirTeamMembersSharedComponentModule, TargetsSharedComponentModule,     ],
    declarations: [ProjectNegotiationEditComponent ],
    exports: [RouterModule],
    providers: [ProjectNegotiationsService]
})
export class ProjectNegotiationEditModule { }
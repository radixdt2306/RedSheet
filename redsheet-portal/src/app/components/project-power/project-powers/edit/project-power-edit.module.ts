import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectPowerEditComponent } from './project-power-edit.component'
import { PROJECT_POWER_EDIT_ROUTING } from './project-power-edit.routing'
import {ProjectPowersService } from "../project-powers.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { PowerTypeDetailsSharedComponentModule } from 'app/components/project-power/power-type-details/power-type-details-shared-component.module'
import { KnowledgeGatheringPlansSharedComponentModule } from 'app/components/project-power/knowledge-gathering-plans/knowledge-gathering-plans-shared-component.module'

@NgModule({
    imports: [
        PROJECT_POWER_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule, PowerTypeDetailsSharedComponentModule, KnowledgeGatheringPlansSharedComponentModule,     ],
    declarations: [ProjectPowerEditComponent ],
    exports: [RouterModule],
    providers: [ProjectPowersService]
})
export class ProjectPowerEditModule { }
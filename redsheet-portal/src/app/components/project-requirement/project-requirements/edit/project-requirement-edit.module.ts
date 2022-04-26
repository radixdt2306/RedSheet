import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectRequirementEditComponent } from './project-requirement-edit.component'
import { PROJECT_REQUIREMENT_EDIT_ROUTING } from './project-requirement-edit.routing'
import {ProjectRequirementsService } from "../project-requirements.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { OurRequirementDetailsSharedComponentModule } from 'app/components/project-requirement/our-requirement-details/our-requirement-details-shared-component.module'
import { OurbatnasSharedComponentModule } from 'app/components/project-requirement/ourbatnas/ourbatnas-shared-component.module'
import { TheirRequirementDetailsSharedComponentModule } from 'app/components/project-requirement/their-requirement-details/their-requirement-details-shared-component.module'
import { TheirBatnasSharedComponentModule } from 'app/components/project-requirement/their-batnas/their-batnas-shared-component.module'
import { ProjectZomasService } from 'app/components/project-module/project-zomas/project-zomas.service';

@NgModule({
    imports: [
        PROJECT_REQUIREMENT_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule, OurRequirementDetailsSharedComponentModule, OurbatnasSharedComponentModule, TheirRequirementDetailsSharedComponentModule, TheirBatnasSharedComponentModule,     ],
    declarations: [ProjectRequirementEditComponent ],
    exports: [RouterModule],
    providers: [ProjectRequirementsService,ProjectZomasService]
})
export class ProjectRequirementEditModule { }
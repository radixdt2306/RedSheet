import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectCultureEditComponent } from './project-culture-edit.component'
import { PROJECT_CULTURE_EDIT_ROUTING } from './project-culture-edit.routing'
import {ProjectCulturesService } from "../project-cultures.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { RxFormsModule } from '@rx/forms';

@NgModule({
    imports: [
        PROJECT_CULTURE_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule,
		ProjectModulesSharedComponentModule,     ],
    declarations: [ProjectCultureEditComponent ],
    exports: [RouterModule],
    providers: [ProjectCulturesService]
})
export class ProjectCultureEditModule { }
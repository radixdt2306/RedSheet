import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectEditComponent } from './project-edit.component'
import { PROJECT_EDIT_ROUTING } from './project-edit.routing'
import {ProjectsService } from "../projects.service";
import { RxFormsModule } from '@rx/forms';
import { ApplicationServicesService } from 'app/components/project/projects/application-services.service';
import { TemplateModuleEditComponent } from 'app/components/project/template-modules/edit/template-module-edit.component';
import { TemplateModuleService } from 'app/components/project/template-modules/template-module.service';

@NgModule({
    imports: [
        PROJECT_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,RxFormsModule
		    ],
    declarations: [ProjectEditComponent,TemplateModuleEditComponent ],
    exports: [RouterModule],
    providers: [ProjectsService,ApplicationServicesService,TemplateModuleService]
})
export class ProjectEditModule { }
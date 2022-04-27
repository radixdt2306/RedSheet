import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {RxFormsModule} from "@rx/forms";
import {    RxTableModule} from "@rx/table";

import { ProjectAddComponent } from './project-add.component'
import { PROJECT_ADD_ROUTING } from './project-add.routing'
import {ProjectsService } from "../projects.service";
import { ApplicationServicesService } from 'app/components/project/projects/application-services.service';
import { TemplateModuleAddComponent } from 'app/components/project/template-modules/add/template-module-add.component';

@NgModule({
    imports: [
        PROJECT_ADD_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule, RxFormsModule
		    ],
    declarations: [ProjectAddComponent,TemplateModuleAddComponent ],
    exports: [RouterModule],
    providers: [ProjectsService,ApplicationServicesService]
})
export class ProjectAddModule { }
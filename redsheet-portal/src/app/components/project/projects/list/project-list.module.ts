import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectListComponent } from './project-list.component'
import { PROJECT_LIST_ROUTING } from './project-list.routing'
import {ProjectsService } from "../projects.service";

@NgModule({
    imports: [
        PROJECT_LIST_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		    ],
    declarations: [ProjectListComponent ],
    exports: [RouterModule],
    providers: [ProjectsService]
})
export class ProjectListModule { }
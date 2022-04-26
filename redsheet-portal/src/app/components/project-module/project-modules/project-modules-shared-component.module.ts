import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectModuleEditComponent } from './edit/project-module-edit.component'
import {ProjectModulesService } from "./project-modules.service";
import {PROJECT_MODULES_SHARED_COMPONENT_CONTAINER } from './project-modules-shared-component.container';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';

import { ProjectModuleReviewsSharedComponentModule } from 'app/components/project-module/project-module-reviews/project-module-reviews-shared-component.module';
import { ProjectsService } from 'app/components/project/projects/projects.service';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectNextModuleEditComponent } from './project-next-module/project-next-module.component';


@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule, ProjectModuleReviewsSharedComponentModule
    ],
    declarations: [ ProjectModuleEditComponent,ProjectModuleHelpDetailComponent, ProjectDetailComponent, ProjectNextModuleEditComponent],
    providers: [ProjectModulesService,ProjectsService ],
    exports: [RouterModule, ProjectModuleEditComponent,ProjectModuleHelpDetailComponent,ProjectDetailComponent, ProjectNextModuleEditComponent ]    
})
export class ProjectModulesSharedComponentModule { }
DynamicComponentContainer.register(PROJECT_MODULES_SHARED_COMPONENT_CONTAINER );
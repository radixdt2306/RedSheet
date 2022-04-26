import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectModuleReviewEditComponent } from './edit/project-module-review-edit.component'
import {ProjectModuleReviewsService } from "./project-module-reviews.service";
import {PROJECT_MODULE_REVIEWS_SHARED_COMPONENT_CONTAINER } from './project-module-reviews-shared-component.container';
import { ProjectsService } from 'app/components/project/projects/projects.service';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectModuleReviewEditComponent, ],
    providers: [ProjectModuleReviewsService,ProjectsService],
    exports: [RouterModule, ProjectModuleReviewEditComponent, ]
})
export class ProjectModuleReviewsSharedComponentModule { }
DynamicComponentContainer.register(PROJECT_MODULE_REVIEWS_SHARED_COMPONENT_CONTAINER );
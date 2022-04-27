import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectPostEventActionListComponent } from './list/project-post-event-action-list.component'
import { ProjectPostEventActionAddComponent } from './add/project-post-event-action-add.component'
import { ProjectPostEventActionEditComponent } from './edit/project-post-event-action-edit.component'
import {ProjectPostEventActionsService } from "./project-post-event-actions.service";
import {PROJECT_POST_EVENT_ACTIONS_SHARED_COMPONENT_CONTAINER } from './project-post-event-actions-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectPostEventActionListComponent,  ProjectPostEventActionAddComponent,  ProjectPostEventActionEditComponent, ],
    providers: [ProjectPostEventActionsService ],
    exports: [RouterModule, ProjectPostEventActionListComponent,  ProjectPostEventActionAddComponent,  ProjectPostEventActionEditComponent, ]
})
export class ProjectPostEventActionsSharedComponentModule { }
//Needs to uncomment in future -RUCHI
//DynamicComponentContainer.register(PROJECT_POST_EVENT_ACTIONS_SHARED_COMPONENT_CONTAINER );
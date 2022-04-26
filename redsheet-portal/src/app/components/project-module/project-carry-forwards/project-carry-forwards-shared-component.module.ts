import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectCarryForwardListComponent } from './list/project-carry-forward-list.component'
import {ProjectCarryForwardsService } from "./project-carry-forwards.service";
import {PROJECT_CARRY_FORWARDS_SHARED_COMPONENT_CONTAINER } from './project-carry-forwards-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectCarryForwardListComponent, ],
    providers: [ProjectCarryForwardsService ],
    exports: [RouterModule, ProjectCarryForwardListComponent, ]
})
export class ProjectCarryForwardsSharedComponentModule { }
DynamicComponentContainer.register(PROJECT_CARRY_FORWARDS_SHARED_COMPONENT_CONTAINER );
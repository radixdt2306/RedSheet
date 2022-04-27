import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { ProjectZomaAddComponent } from './add/project-zoma-add.component'
import {ProjectZomasService } from "./project-zomas.service";
import {PROJECT_ZOMAS_SHARED_COMPONENT_CONTAINER } from './project-zomas-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ ProjectZomaAddComponent, ],
    providers: [ProjectZomasService ],
    exports: [RouterModule, ProjectZomaAddComponent, ]
})
export class ProjectZomasSharedComponentModule { }
DynamicComponentContainer.register(PROJECT_ZOMAS_SHARED_COMPONENT_CONTAINER );
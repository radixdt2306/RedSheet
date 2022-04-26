import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { NanoProjectNegotiableListComponent } from './list/nano-project-negotiable-list.component'
import { NanoProjectNegotiableAddComponent } from './add/nano-project-negotiable-add.component'
import { NanoProjectNegotiableEditComponent } from './edit/nano-project-negotiable-edit.component'
import {NanoProjectNegotiablesService } from "./nano-project-negotiables.service";
import {NANO_PROJECT_NEGOTIABLES_SHARED_COMPONENT_CONTAINER } from './nano-project-negotiables-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ NanoProjectNegotiableListComponent,  NanoProjectNegotiableAddComponent,  NanoProjectNegotiableEditComponent, ],
    providers: [NanoProjectNegotiablesService ],
    exports: [RouterModule, NanoProjectNegotiableListComponent,  NanoProjectNegotiableAddComponent,  NanoProjectNegotiableEditComponent, ]
})
export class NanoProjectNegotiablesSharedComponentModule { }
//DynamicComponentContainer.register(NANO_PROJECT_NEGOTIABLES_SHARED_COMPONENT_CONTAINER );
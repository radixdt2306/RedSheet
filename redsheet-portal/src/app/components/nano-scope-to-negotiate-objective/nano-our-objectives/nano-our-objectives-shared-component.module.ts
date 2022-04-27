import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { NanoOurObjectiveListComponent } from './list/nano-our-objective-list.component'
import {NanoOurObjectivesService } from "./nano-our-objectives.service";
import {NANO_OUR_OBJECTIVES_SHARED_COMPONENT_CONTAINER } from './nano-our-objectives-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ NanoOurObjectiveListComponent, ],
    providers: [NanoOurObjectivesService ],
    exports: [RouterModule, NanoOurObjectiveListComponent, ]
})
export class NanoOurObjectivesSharedComponentModule { }
DynamicComponentContainer.register(NANO_OUR_OBJECTIVES_SHARED_COMPONENT_CONTAINER );
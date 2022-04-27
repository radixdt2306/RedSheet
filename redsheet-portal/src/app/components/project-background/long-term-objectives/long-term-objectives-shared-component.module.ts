import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LongTermObjectiveListComponent } from './list/long-term-objective-list.component'
import {LongTermObjectivesService } from "./long-term-objectives.service";
import {LONG_TERM_OBJECTIVES_SHARED_COMPONENT_CONTAINER } from './long-term-objectives-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LongTermObjectiveListComponent, ],
    providers: [LongTermObjectivesService ],
    exports: [RouterModule, LongTermObjectiveListComponent, ]
})
export class LongTermObjectivesSharedComponentModule { }
DynamicComponentContainer.register(LONG_TERM_OBJECTIVES_SHARED_COMPONENT_CONTAINER );
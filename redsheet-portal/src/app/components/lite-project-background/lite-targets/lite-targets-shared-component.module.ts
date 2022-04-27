import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteTargetListComponent } from './list/lite-target-list.component'
import {LiteTargetsService } from "./lite-targets.service";
import {LITE_TARGETS_SHARED_COMPONENT_CONTAINER } from './lite-targets-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteTargetListComponent, ],
    providers: [LiteTargetsService ],
    exports: [RouterModule, LiteTargetListComponent, ]
})
export class LiteTargetsSharedComponentModule { }
DynamicComponentContainer.register(LITE_TARGETS_SHARED_COMPONENT_CONTAINER );
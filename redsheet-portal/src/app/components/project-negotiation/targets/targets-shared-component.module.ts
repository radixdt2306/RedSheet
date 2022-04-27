import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { TargetListComponent } from './list/target-list.component'
import {TargetsService } from "./targets.service";
import {TARGETS_SHARED_COMPONENT_CONTAINER } from './targets-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ TargetListComponent, ],
    providers: [TargetsService ],
    exports: [RouterModule, TargetListComponent, ]
})
export class TargetsSharedComponentModule { }
DynamicComponentContainer.register(TARGETS_SHARED_COMPONENT_CONTAINER );
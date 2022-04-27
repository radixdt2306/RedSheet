import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { PowerTypeDetailListComponent } from './list/power-type-detail-list.component'
import {PowerTypeDetailsService } from "./power-type-details.service";
import {POWER_TYPE_DETAILS_SHARED_COMPONENT_CONTAINER } from './power-type-details-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ PowerTypeDetailListComponent, ],
    providers: [PowerTypeDetailsService ],
    exports: [RouterModule, PowerTypeDetailListComponent, ]
})
export class PowerTypeDetailsSharedComponentModule { }
DynamicComponentContainer.register(POWER_TYPE_DETAILS_SHARED_COMPONENT_CONTAINER );
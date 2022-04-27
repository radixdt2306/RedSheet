import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { TheirRequirementDetailListComponent } from './list/their-requirement-detail-list.component'
import { TheirRequirementDetailAddComponent } from './add/their-requirement-detail-add.component'
import { TheirRequirementDetailEditComponent } from './edit/their-requirement-detail-edit.component'
import {TheirRequirementDetailsService } from "./their-requirement-details.service";
import {THEIR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER } from './their-requirement-details-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ TheirRequirementDetailListComponent,  TheirRequirementDetailAddComponent,  TheirRequirementDetailEditComponent, ],
    providers: [TheirRequirementDetailsService ],
    exports: [RouterModule, TheirRequirementDetailListComponent,  TheirRequirementDetailAddComponent,  TheirRequirementDetailEditComponent, ]
})
export class TheirRequirementDetailsSharedComponentModule { }
DynamicComponentContainer.register(THEIR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER );
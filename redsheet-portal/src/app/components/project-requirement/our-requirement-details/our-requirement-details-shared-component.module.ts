import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { OurRequirementDetailListComponent } from './list/our-requirement-detail-list.component'
import { OurRequirementDetailAddComponent } from './add/our-requirement-detail-add.component'
import { OurRequirementDetailEditComponent } from './edit/our-requirement-detail-edit.component'
import {OurRequirementDetailsService } from "./our-requirement-details.service";
import {OUR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER } from './our-requirement-details-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ OurRequirementDetailListComponent,  OurRequirementDetailAddComponent,  OurRequirementDetailEditComponent, ],
    providers: [OurRequirementDetailsService ],
    exports: [RouterModule, OurRequirementDetailListComponent,  OurRequirementDetailAddComponent,  OurRequirementDetailEditComponent, ]
})
export class OurRequirementDetailsSharedComponentModule { }
DynamicComponentContainer.register(OUR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER );
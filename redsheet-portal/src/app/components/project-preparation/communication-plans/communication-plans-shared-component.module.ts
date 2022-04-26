import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { CommunicationPlanListComponent } from './list/communication-plan-list.component'
import { CommunicationPlanAddComponent } from './add/communication-plan-add.component'
import { CommunicationPlanEditComponent } from './edit/communication-plan-edit.component'
import {CommunicationPlansService } from "./communication-plans.service";
import {COMMUNICATION_PLANS_SHARED_COMPONENT_CONTAINER } from './communication-plans-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ CommunicationPlanListComponent,  CommunicationPlanAddComponent,  CommunicationPlanEditComponent, ],
    providers: [CommunicationPlansService ],
    exports: [RouterModule, CommunicationPlanListComponent,  CommunicationPlanAddComponent,  CommunicationPlanEditComponent, ]
})
export class CommunicationPlansSharedComponentModule { }
DynamicComponentContainer.register(COMMUNICATION_PLANS_SHARED_COMPONENT_CONTAINER );
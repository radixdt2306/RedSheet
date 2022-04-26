import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { KnowledgeGatheringPlanListComponent } from './list/knowledge-gathering-plan-list.component'
import { KnowledgeGatheringPlanAddComponent } from './add/knowledge-gathering-plan-add.component'
import { KnowledgeGatheringPlanEditComponent } from './edit/knowledge-gathering-plan-edit.component'
import {KnowledgeGatheringPlansService } from "./knowledge-gathering-plans.service";
import {KNOWLEDGE_GATHERING_PLANS_SHARED_COMPONENT_CONTAINER } from './knowledge-gathering-plans-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ KnowledgeGatheringPlanListComponent,  KnowledgeGatheringPlanAddComponent,  KnowledgeGatheringPlanEditComponent, ],
    providers: [KnowledgeGatheringPlansService ],
    exports: [RouterModule, KnowledgeGatheringPlanListComponent,  KnowledgeGatheringPlanAddComponent,  KnowledgeGatheringPlanEditComponent, ]
})
export class KnowledgeGatheringPlansSharedComponentModule { }
DynamicComponentContainer.register(KNOWLEDGE_GATHERING_PLANS_SHARED_COMPONENT_CONTAINER );
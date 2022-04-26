import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module';
import { NanoNegotiationPlanListComponent } from 'app/components/nano-negotiation-plan/list/nano-negotiation-plan-list.component';
import { NanoTheirBatnasSharedComponentModule } from 'app/components/project-module/nano-their-batnas/nano-their-batnas-shared-component.module';
import { NanoOurBatnasSharedComponentModule } from 'app/components/project-module/nano-our-batnas/nano-our-batnas-shared-component.module';
import { NanoDiscussionSequencesSharedComponentModule } from 'app/components/project-module/nano-discussion-sequences/nano-discussion-sequences-shared-component.module';
import { NanoProjectNegotiablesSharedComponentModule } from 'app/components/project-module/nano-project-negotiables/nano-project-negotiables-shared-component.module';
import {NANO_NEGOTIATION_PLAN_LIST_ROUTING} from './nano-negotiation-plan.routing';

@NgModule({
    imports: [ NANO_NEGOTIATION_PLAN_LIST_ROUTING,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
        ProjectModulesSharedComponentModule,
            NanoOurBatnasSharedComponentModule,
            NanoTheirBatnasSharedComponentModule,NanoDiscussionSequencesSharedComponentModule,
            NanoProjectNegotiablesSharedComponentModule
		 ],
    declarations: [NanoNegotiationPlanListComponent],
    exports: [RouterModule],
    providers: [],    
})
export class NanoNegotiationPlanModule { 
    ;
}
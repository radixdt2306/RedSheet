import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PostEventListComponent } from 'app/components/post-event/list/post-event-list.component';
import { PageAccess } from "app/domain/authorization";
import { NanoNegotiationPlanListComponent } from 'app/components/nano-negotiation-plan/list/nano-negotiation-plan-list.component';



const NANO_NEGOTIATION_PLAN_ROUTES: Routes = [{
    path: '',        
    component: NanoNegotiationPlanListComponent,    
    data: {
        rootModuleId: 33, applicationModuleId: 5099, accessItem: 'list', keyName: 'nanoProjectNegotiableId'
    },
    canActivate: [PageAccess]
}];

export const NANO_NEGOTIATION_PLAN_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(NANO_NEGOTIATION_PLAN_ROUTES);

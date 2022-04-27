import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PostEventListComponent } from 'app/components/post-event/list/post-event-list.component';
import { PageAccess } from "app/domain/authorization";
import { ProjectImplementationPlanListComponent } from "app/components/project-module/project-implementation-plans/list/project-implementation-plan-list.component";



const POST_EVENT_ROUTES: Routes = [{
    path: '',        
    component: PostEventListComponent,    
    data: {
        rootModuleId: 33, applicationModuleId: 5099, accessItem: 'list', keyName: 'projectImplementationPlanId'
    },
    canActivate: [PageAccess]
}];

export const POST_EVENT_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(POST_EVENT_ROUTES);

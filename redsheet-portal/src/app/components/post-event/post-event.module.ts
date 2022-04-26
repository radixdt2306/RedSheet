import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";
import { ProjectCarryForwardsSharedComponentModule } from 'app/components/project-module/project-carry-forwards/project-carry-forwards-shared-component.module';
import { ProjectImplementationPlansSharedComponentModule } from 'app/components/project-module/project-implementation-plans/project-implementation-plans-shared-component.module';
import { ProjectPostEventActionsSharedComponentModule } from 'app/components/project-module/project-post-event-actions/project-post-event-actions-shared-component.module';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module';
import { PostEventListComponent } from 'app/components/post-event/list/post-event-list.component';
import {POST_EVENT_LIST_ROUTING} from './post-event.routing';

@NgModule({
    imports: [ POST_EVENT_LIST_ROUTING,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
        ProjectCarryForwardsSharedComponentModule,
        ProjectImplementationPlansSharedComponentModule,ProjectPostEventActionsSharedComponentModule,        
        ProjectModulesSharedComponentModule,ProjectImplementationPlansSharedComponentModule
		 ],
    declarations: [PostEventListComponent],
    exports: [RouterModule],
    providers: [],    
})
export class PostEventModule { }
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxFormsModule} from "@rx/forms";
import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { LiteProjectBackgroundEditComponent } from './lite-project-background-edit.component'
import { LITE_PROJECT_BACKGROUND_EDIT_ROUTING } from './lite-project-background-edit.routing'
import {LiteProjectBackgroundsService } from "../lite-project-backgrounds.service";
import { LiteTheirTeamMembersSharedComponentModule } from 'app/components/lite-project-background/lite-their-team-members/lite-their-team-members-shared-component.module'
import { LiteOurTeamMembersSharedComponentModule } from 'app/components/lite-project-background/lite-our-team-members/lite-our-team-members-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { LiteTargetsSharedComponentModule } from 'app/components/lite-project-background/lite-targets/lite-targets-shared-component.module'

@NgModule({
    imports: [
        LITE_PROJECT_BACKGROUND_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule, RxFormsModule, FormsModule, ReactiveFormsModule,
		LiteTheirTeamMembersSharedComponentModule, LiteOurTeamMembersSharedComponentModule, ProjectModulesSharedComponentModule, LiteTargetsSharedComponentModule    ],
    declarations: [LiteProjectBackgroundEditComponent ],
    exports: [RouterModule],
    providers: [LiteProjectBackgroundsService]
})
export class LiteProjectBackgroundEditModule { }
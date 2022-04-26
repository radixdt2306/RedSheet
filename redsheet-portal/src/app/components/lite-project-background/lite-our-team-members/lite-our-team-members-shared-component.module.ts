import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteOurTeamMemberListComponent } from './list/lite-our-team-member-list.component'
import { LiteOurTeamMemberAddComponent } from './add/lite-our-team-member-add.component'
import { LiteOurTeamMemberEditComponent } from './edit/lite-our-team-member-edit.component'
import {LiteOurTeamMembersService } from "./lite-our-team-members.service";
import {LITE_OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER } from './lite-our-team-members-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteOurTeamMemberListComponent,  LiteOurTeamMemberAddComponent,  LiteOurTeamMemberEditComponent, ],
    providers: [LiteOurTeamMembersService ],
    exports: [RouterModule, LiteOurTeamMemberListComponent,  LiteOurTeamMemberAddComponent,  LiteOurTeamMemberEditComponent, ]
})
export class LiteOurTeamMembersSharedComponentModule { }
DynamicComponentContainer.register(LITE_OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER );
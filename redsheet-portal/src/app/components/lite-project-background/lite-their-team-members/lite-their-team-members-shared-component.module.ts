import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { LiteTheirTeamMemberListComponent } from './list/lite-their-team-member-list.component'
import { LiteTheirTeamMemberAddComponent } from './add/lite-their-team-member-add.component'
import { LiteTheirTeamMemberEditComponent } from './edit/lite-their-team-member-edit.component'
import {LiteTheirTeamMembersService } from "./lite-their-team-members.service";
import {LITE_THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER } from './lite-their-team-members-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ LiteTheirTeamMemberListComponent,  LiteTheirTeamMemberAddComponent,  LiteTheirTeamMemberEditComponent, ],
    providers: [LiteTheirTeamMembersService ],
    exports: [RouterModule, LiteTheirTeamMemberListComponent,  LiteTheirTeamMemberAddComponent,  LiteTheirTeamMemberEditComponent, ]
})
export class LiteTheirTeamMembersSharedComponentModule { }
DynamicComponentContainer.register(LITE_THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER );
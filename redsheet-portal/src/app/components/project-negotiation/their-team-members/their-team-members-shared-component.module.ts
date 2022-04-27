import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { TheirTeamMemberListComponent } from './list/their-team-member-list.component'
import { TheirTeamMemberAddComponent } from './add/their-team-member-add.component'
import { TheirTeamMemberEditComponent } from './edit/their-team-member-edit.component'
import {TheirTeamMembersService } from "./their-team-members.service";
import {THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER } from './their-team-members-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ TheirTeamMemberListComponent,  TheirTeamMemberAddComponent,  TheirTeamMemberEditComponent, ],
    providers: [TheirTeamMembersService ],
    exports: [RouterModule, TheirTeamMemberListComponent,  TheirTeamMemberAddComponent,  TheirTeamMemberEditComponent, ]
})
export class TheirTeamMembersSharedComponentModule { }
DynamicComponentContainer.register(THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER );
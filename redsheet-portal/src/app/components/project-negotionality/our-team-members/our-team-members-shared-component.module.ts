import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { OurTeamMemberListComponent } from './list/our-team-member-list.component'
import { OurTeamMemberAddComponent } from './add/our-team-member-add.component'
import { OurTeamMemberEditComponent } from './edit/our-team-member-edit.component'
import {OurTeamMembersService } from "./our-team-members.service";
import {OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER } from './our-team-members-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ OurTeamMemberListComponent,  OurTeamMemberAddComponent,  OurTeamMemberEditComponent, ],
    providers: [OurTeamMembersService ],
    exports: [RouterModule, OurTeamMemberListComponent,  OurTeamMemberAddComponent,  OurTeamMemberEditComponent, ]
})
export class OurTeamMembersSharedComponentModule { }
DynamicComponentContainer.register(OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER );
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { USER_PROFILE_ROUTING } from "app/components/user-profile/user-profile.routing";
import { UserProfileComponent } from "app/components/user-profile/user-profile.component";
import { UserProfileService } from "./user-profile.service";
import { UsersService } from "app/components/users/users.service";
@NgModule({
    imports: [
        USER_PROFILE_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [UserProfileComponent ],
    exports: [RouterModule],
    providers: [UserProfileService, UsersService]
})
export class UserProfileModule { }

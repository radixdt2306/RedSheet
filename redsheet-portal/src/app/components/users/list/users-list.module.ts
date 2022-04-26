import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from "app/components/users/users.service";
import { USERS_LIST_ROUTING } from "app/components/users/list/users-list.routing";
import { UsersListComponent } from "app/components/users/list/users-list.component";
@NgModule({
    imports: [
        USERS_LIST_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [UsersListComponent ],
    exports: [RouterModule],
    providers: [UsersService]
})
export class UsersListModule { }

import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from "app/components/users/users.service";
import { USERS_ADD_ROUTING } from "app/components/users/add/users-add.routing";
import { UsersAddComponent } from "app/components/users/add/users-add.component";
@NgModule({
    imports: [
        USERS_ADD_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [UsersAddComponent ],
    exports: [RouterModule],
    providers: [UsersService]
})
export class UsersAddModule { }

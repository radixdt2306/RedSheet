import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from "app/components/users/users.service";
import { USERS_EDIT_ROUTING } from "app/components/users/edit/users-edit.routing";
import { UsersEditComponent } from "app/components/users/edit/users-edit.component";
@NgModule({
    imports: [
        USERS_EDIT_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [UsersEditComponent ],
    exports: [RouterModule],
    providers: [UsersService]
})
export class UsersEditModule { }

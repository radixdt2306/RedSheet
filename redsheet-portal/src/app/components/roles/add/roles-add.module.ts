import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolesService } from "app/components/roles/roles.service";
import { ROLES_ADD_ROUTING } from "app/components/roles/add/roles-add.routing";
import { RolesAddComponent } from "app/components/roles/add/roles-add.component";
@NgModule({
    imports: [
        ROLES_ADD_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [RolesAddComponent ],
    exports: [RouterModule],
    providers: [RolesService]
})
export class RolesAddModule { }

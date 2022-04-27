import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolesService } from "app/components/roles/roles.service";
import { ROLES_LIST_ROUTING } from "app/components/roles/list/roles-list.routing";
import { RolesListComponent } from "app/components/roles/list/roles-list.component";
@NgModule({
    imports: [
        ROLES_LIST_ROUTING,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [RolesListComponent ],
    exports: [RouterModule],
    providers: [RolesService]
})
export class RolesListModule { }

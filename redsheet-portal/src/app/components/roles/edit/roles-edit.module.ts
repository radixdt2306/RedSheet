import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {RxViewModule } from '@rx/view';
import { RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolesService } from "app/components/roles/roles.service";
import { ROLES_EDIT_ROUTING } from "app/components/roles/edit/roles-edit.routing";
import { RolesEditComponent } from "app/components/roles/edit/roles-edit.component";
@NgModule({
    imports: [
        ROLES_EDIT_ROUTING,
        FormsModule,
        ReactiveFormsModule,
        RxViewModule,
        CommonModule, RxTableModule, RxFormsModule
    ],
    declarations: [RolesEditComponent ],
    exports: [RouterModule],
    providers: [RolesService]
})
export class RolesEditModule { }

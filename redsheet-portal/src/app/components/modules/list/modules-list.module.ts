import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import { RxTableModule } from "@rx/table";
import { MODULES_LIST_ROUTING } from "app/components/modules/list/modules-list.routing";
import { ModulesListComponent } from "app/components/modules/list/modules-list.component";
import { ModulesService } from "app/components/modules/modules.service";

@NgModule({
    imports: [
        MODULES_LIST_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ModulesListComponent ],
    providers: [ModulesService],
    exports: [RouterModule]
})
export class ModulesListModule { }

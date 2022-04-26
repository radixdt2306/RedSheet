import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { TheirBatnaListComponent } from './list/their-batna-list.component'
import {TheirBatnasService } from "./their-batnas.service";
import {THEIR_BATNAS_SHARED_COMPONENT_CONTAINER } from './their-batnas-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ TheirBatnaListComponent, ],
    providers: [TheirBatnasService ],
    exports: [RouterModule, TheirBatnaListComponent, ]
})
export class TheirBatnasSharedComponentModule { }
DynamicComponentContainer.register(THEIR_BATNAS_SHARED_COMPONENT_CONTAINER );
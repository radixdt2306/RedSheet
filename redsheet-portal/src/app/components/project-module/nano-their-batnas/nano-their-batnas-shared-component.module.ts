import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { NanoTheirBatnaListComponent } from './list/nano-their-batna-list.component'
import {NanoTheirBatnasService } from "./nano-their-batnas.service";
import {NANO_THEIR_BATNAS_SHARED_COMPONENT_CONTAINER } from './nano-their-batnas-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ NanoTheirBatnaListComponent, ],
    providers: [NanoTheirBatnasService ],
    exports: [RouterModule, NanoTheirBatnaListComponent, ]
})
export class NanoTheirBatnasSharedComponentModule { }
DynamicComponentContainer.register(NANO_THEIR_BATNAS_SHARED_COMPONENT_CONTAINER );
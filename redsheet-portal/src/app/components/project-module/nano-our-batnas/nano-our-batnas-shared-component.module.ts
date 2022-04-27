import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { NanoOurBatnaListComponent } from './list/nano-our-batna-list.component'
import {NanoOurBatnasService } from "./nano-our-batnas.service";
import {NANO_OUR_BATNAS_SHARED_COMPONENT_CONTAINER } from './nano-our-batnas-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ NanoOurBatnaListComponent, ],
    providers: [NanoOurBatnasService ],
    exports: [RouterModule, NanoOurBatnaListComponent, ]
})
export class NanoOurBatnasSharedComponentModule { }
DynamicComponentContainer.register(NANO_OUR_BATNAS_SHARED_COMPONENT_CONTAINER );
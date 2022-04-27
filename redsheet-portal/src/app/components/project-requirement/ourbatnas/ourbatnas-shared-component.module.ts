import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { OurbatnaListComponent } from './list/ourbatna-list.component'
import {OurbatnasService } from "./ourbatnas.service";
import {OURBATNAS_SHARED_COMPONENT_CONTAINER } from './ourbatnas-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ OurbatnaListComponent, ],
    providers: [OurbatnasService ],
    exports: [RouterModule, OurbatnaListComponent, ]
})
export class OurbatnasSharedComponentModule { }
DynamicComponentContainer.register(OURBATNAS_SHARED_COMPONENT_CONTAINER );
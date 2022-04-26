import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { MultilingualListComponent } from './multilingual-list.component'
import { MULTILINGUAL_LIST_ROUTING } from './multilingual-list.routing'
import { LanguageContentMultilingualComponent } from "./../language-content-multilingual/language-content-multilingual.component";
import { ModuleContentMultilingualComponent } from "./../module-content-multilingual/module-content-multilingual.component";
import { LanguageContentMultilingualService } from "./../language-content-multilingual/language-content-multilingual.service";
import { ModuleContentMultilingualService } from "./../module-content-multilingual/module-content-multilingual.service";
import { MultilingualSharedComponentModule } from "app/components/multilingual/multilingual-shared.component.module";

@NgModule({
    imports: [
        MULTILINGUAL_LIST_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule, MultilingualSharedComponentModule
    ],
    declarations: [MultilingualListComponent],
    providers: [LanguageContentMultilingualService,ModuleContentMultilingualService],
    exports: [RouterModule]
})
export class MultilingualListModule { }

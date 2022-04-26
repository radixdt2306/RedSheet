import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { DynamicComponentContainer } from '@rx/core';
import { LanguageContentMultilingualComponent } from "app/components/multilingual/language-content-multilingual/language-content-multilingual.component";
import { ModuleContentMultilingualComponent } from "app/components/multilingual/module-content-multilingual/module-content-multilingual.component";
import { LanguageContentMultilingualService } from "app/components/multilingual/language-content-multilingual/language-content-multilingual.service";
import { ModuleContentMultilingualService } from "app/components/multilingual/module-content-multilingual/module-content-multilingual.service";
import { MULTILINGUAL_SHARED_COMPONENT_CONTAINER } from "app/components/multilingual/multilingual-shared-component.container";

@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [LanguageContentMultilingualComponent, ModuleContentMultilingualComponent ],
    providers: [LanguageContentMultilingualService, ModuleContentMultilingualService],
    exports: [RouterModule, LanguageContentMultilingualComponent, ModuleContentMultilingualComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultilingualSharedComponentModule { }
DynamicComponentContainer.register(MULTILINGUAL_SHARED_COMPONENT_CONTAINER );
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { GlobalSettingsComponent } from './global-settings.component'
import { GLOBAL_SETTINGS_ROUTING } from './global-settings.routing'
import { GlobalSettingsService } from "./global-settings.service";

@NgModule({
    imports: [
        GLOBAL_SETTINGS_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [GlobalSettingsComponent ],
    providers: [GlobalSettingsService],
    exports: [RouterModule]
})
export class GlobalSettingsModule { }

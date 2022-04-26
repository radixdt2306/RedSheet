import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {CommonModule } from "@angular/common";
import {RouterModule } from '@angular/router';

import { LanguagesComponent } from './languages.component';
import { LANGUAGES_ROUTING } from './languages.routing';
import { LanguagesService } from "./languages.service";
import {RxTableModule } from "@rx/table";
import { RxViewModule } from "@rx/view";


@NgModule({
    imports: [LANGUAGES_ROUTING, CommonModule, RxTableModule, RxViewModule],
    declarations: [LanguagesComponent],
    providers: [LanguagesService],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LanguagesModule { }

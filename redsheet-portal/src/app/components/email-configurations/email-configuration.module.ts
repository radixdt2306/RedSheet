import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import { RxTableModule } from "@rx/table";
import { EmailConfigurationComponent } from './email-configuration.component'
import { EMAIL_CONFIGURATION_ROUTING } from './email-configuration.routing'
import { EmailConfigurationService } from "./email-configuration.service";

@NgModule({
    imports: [
        EMAIL_CONFIGURATION_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [EmailConfigurationComponent ],
    providers: [EmailConfigurationService],
    exports: [RouterModule]
})
export class EmailConfigurationModule { }

import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import { RxTableModule } from "@rx/table";
import { PASSWORD_POLICY_ROUTING } from "app/components/password-policy/password-policy.routing";
import { PasswordPolicyComponent } from "app/components/password-policy/password-policy.component";
import { PasswordPolicyService } from "app/components/password-policy/password-policy.service";

@NgModule({
    imports: [
        PASSWORD_POLICY_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [PasswordPolicyComponent ],
    providers: [PasswordPolicyService],
    exports: [RouterModule]
})
export class PasswordPolicyModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";
import { LOGIN_ROUTING } from "app/components/login/login/login-routing";
import { LoginService } from "app/components/login/login.service";
import { RxFormsModule } from "@rx/forms";
import { FORGOT_PASSWORD_ROUTING } from "app/components/login/forgot-password/forgot-password-routing";
import { ForgotPasswordComponent } from "app/components/login/forgot-password/forgot-password.component";
import { ForgotPasswordService } from "app/components/login/forgot-password/forgot-password.service";

@NgModule({
    imports: [
        FORGOT_PASSWORD_ROUTING,
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, RxFormsModule
    ],
    declarations: [ForgotPasswordComponent],
    exports: [RouterModule],
    providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }

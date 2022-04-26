import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";
import { LOGIN_ROUTING } from "app/components/login/login/login-routing";
import { LoginService } from "app/components/login/login.service";

import { LoginComponent } from "app/components/login/login/login.component";
import { RxFormsModule } from "@rx/forms";

@NgModule({
    imports: [
        LOGIN_ROUTING,
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, RxFormsModule
    ],
    declarations: [LoginComponent],
    exports: [RouterModule],
    providers: [LoginService]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RxViewModule } from "@rx/view";
import { RxTableModule } from "@rx/table";
import { LOGIN_ROUTING } from "app/components/login/login/login-routing";
import { LoginService } from "app/components/login/login.service";
import { RxFormsModule } from "@rx/forms";
import { RESET_PASSWORD_ROUTING } from "app/components/login/reset-password/reset-password-routing";
import { ResetPasswordComponent } from "app/components/login/reset-password/reset-password.component";
import { ResetPasswordService } from "app/components/login/reset-password/reset-password.service";
import { LoginModule } from 'app/components/login/login.module';
import { PopoverComponent } from 'app/components/login/Popover/popover.component';
import { popoverService } from 'app/components/login/Popover/popover.service';


@NgModule({
    imports: [        
        CommonModule, RxViewModule, RxTableModule, FormsModule, ReactiveFormsModule, RxFormsModule
    ],    
    declarations: [PopoverComponent],
    exports: [RouterModule],
    providers: [popoverService]
})
export class PopoverModule { }

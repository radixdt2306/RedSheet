import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTING } from "app/components/login/login.routing";
import { LoginService } from "app/components/login/login.service";

@NgModule({
    imports: [LOGIN_ROUTING],
    exports: [RouterModule],
    providers: [LoginService]    
})
export class LoginModule { }

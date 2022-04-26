import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PasswordPolicyComponent } from "./password-policy.component";


const PASSWORD_POLICY_ROUTES: Routes = [{
    path: '', component: PasswordPolicyComponent
},
];

export const PASSWORD_POLICY_ROUTING : ModuleWithProviders = RouterModule.forChild(PASSWORD_POLICY_ROUTES);
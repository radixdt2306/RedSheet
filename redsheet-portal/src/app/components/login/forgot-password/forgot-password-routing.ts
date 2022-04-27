import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_FULL } from "app/domain/const";
import { ForgotPasswordComponent } from "app/components/login/forgot-password/forgot-password.component";


const   FORGOT_PASSWORD_ROUTES: Routes = [{
    path: '',
    component: ForgotPasswordComponent,
    canActivate: [PageAccess],
    data: { rootModuleId: 34, applicationModuleId: 5103, accessItem: REQUEST_METHOD_FULL,  childModuleName: '', keyName: '' }
}];

export const FORGOT_PASSWORD_ROUTING: ModuleWithProviders = RouterModule.forChild(FORGOT_PASSWORD_ROUTES);

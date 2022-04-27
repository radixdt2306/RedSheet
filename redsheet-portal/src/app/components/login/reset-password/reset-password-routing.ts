import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_FULL } from "app/domain/const";
import { ResetPasswordComponent } from "app/components/login/reset-password/reset-password.component";


const   RESET_PASSWORD_ROUTES: Routes = [{
    path: '',
    component: ResetPasswordComponent,
    canActivate: [PageAccess],
    data: { rootModuleId: 34, applicationModuleId: 5132, accessItem: REQUEST_METHOD_FULL,  childModuleName: '', keyName: '' }
}];

export const RESET_PASSWORD_ROUTING: ModuleWithProviders = RouterModule.forChild(RESET_PASSWORD_ROUTES);

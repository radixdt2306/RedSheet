import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { EmailConfigurationComponent } from "./email-configuration.component";


const EMAIL_CONFIGURATION_ROUTES: Routes = [{
    path: '', component: EmailConfigurationComponent
},
];

export const EMAIL_CONFIGURATION_ROUTING: ModuleWithProviders = RouterModule.forChild(EMAIL_CONFIGURATION_ROUTES);
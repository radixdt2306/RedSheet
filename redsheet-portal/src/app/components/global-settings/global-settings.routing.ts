import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { GlobalSettingsComponent } from "./global-settings.component";


const GLOBAL_SETTINGS_ROUTES: Routes = [{
    path: '', component: GlobalSettingsComponent
},
];

export const GLOBAL_SETTINGS_ROUTING : ModuleWithProviders = RouterModule.forChild(GLOBAL_SETTINGS_ROUTES);
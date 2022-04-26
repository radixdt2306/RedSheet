import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectPowerEditComponent } from './project-power-edit.component'

const PROJECT_POWER_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectPowerEditComponent
}];

export const PROJECT_POWER_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_POWER_EDIT_ROUTES);
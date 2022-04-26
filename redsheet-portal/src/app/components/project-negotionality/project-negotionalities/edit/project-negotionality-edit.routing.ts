import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectNegotionalityEditComponent } from './project-negotionality-edit.component'

const PROJECT_NEGOTIONALITY_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectNegotionalityEditComponent
}];

export const PROJECT_NEGOTIONALITY_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIONALITY_EDIT_ROUTES);
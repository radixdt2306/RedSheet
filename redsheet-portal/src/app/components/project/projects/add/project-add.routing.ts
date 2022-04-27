import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectAddComponent } from './project-add.component'

const PROJECT_ADD_ROUTES: Routes = [{
    path: '', component: ProjectAddComponent
}];

export const PROJECT_ADD_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_ADD_ROUTES);
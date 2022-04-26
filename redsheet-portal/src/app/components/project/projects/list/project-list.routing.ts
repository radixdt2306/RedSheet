import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list.component'

const PROJECT_LIST_ROUTES: Routes = [{
    path: '', component: ProjectListComponent
}];

export const PROJECT_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_LIST_ROUTES);
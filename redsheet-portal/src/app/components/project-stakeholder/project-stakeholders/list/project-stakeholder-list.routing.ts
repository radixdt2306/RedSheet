import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectStakeholderListComponent } from './project-stakeholder-list.component'

const PROJECT_STAKEHOLDER_LIST_ROUTES: Routes = [{
    path: '', component: ProjectStakeholderListComponent
}];

export const PROJECT_STAKEHOLDER_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_STAKEHOLDER_LIST_ROUTES);
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_STAKEHOLDER_ROUTES: Routes = [
    {
        path: 'project-stakeholders',
        loadChildren: './project-stakeholders/project-stakeholders.module#ProjectStakeholdersModule'
    },
//route paths
];

export const PROJECT_STAKEHOLDER_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_STAKEHOLDER_ROUTES);

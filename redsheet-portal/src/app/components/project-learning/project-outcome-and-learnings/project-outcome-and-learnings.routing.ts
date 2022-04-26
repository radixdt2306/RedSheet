import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_OUTCOME_AND_LEARNINGS_ROUTES: Routes = [
	{
	//path: ':projectOutcomeAndLearningId', 
	path: '', 
	loadChildren: './edit/project-outcome-and-learning-edit.module#ProjectOutcomeAndLearningEditModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 5098, accessItem: 'edit', keyName: 'projectOutcomeAndLearningId' }
	},
];

export const PROJECT_OUTCOME_AND_LEARNINGS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_OUTCOME_AND_LEARNINGS_ROUTES);

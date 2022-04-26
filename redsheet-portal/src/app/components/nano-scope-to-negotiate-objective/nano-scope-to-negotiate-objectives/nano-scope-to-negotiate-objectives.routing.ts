import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const NANO_SCOPE_TO_NEGOTIATE_OBJECTIVES_ROUTES: Routes = [
	{
    path: ':nanoScopeToNegotiateObjectiveId', 
	loadChildren: './edit/nano-scope-to-negotiate-objective-edit.module#NanoScopeToNegotiateObjectiveEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 6143, accessItem: 'edit', keyName: 'nanoScopeToNegotiateObjectiveId' }
	},
];

export const NANO_SCOPE_TO_NEGOTIATE_OBJECTIVES_ROUTING: ModuleWithProviders = RouterModule.forChild(NANO_SCOPE_TO_NEGOTIATE_OBJECTIVES_ROUTES);

import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const LITE_PROJECT_BACKGROUNDS_ROUTES: Routes = [
	{
    path: ':liteProjectBackgroundId', 
	loadChildren: './edit/lite-project-background-edit.module#LiteProjectBackgroundEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 6137, accessItem: 'edit', keyName: 'liteProjectBackgroundId' }
	},
];

export const LITE_PROJECT_BACKGROUNDS_ROUTING: ModuleWithProviders = RouterModule.forChild(LITE_PROJECT_BACKGROUNDS_ROUTES);

import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesListComponent } from "app/components/modules/list/modules-list.component";
import { PageAccess } from "app/domain/authorization";


const MODULES_LIST_ROUTES: Routes = [{
    path: '', component: ModulesListComponent,
},
];

export const MODULES_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(MODULES_LIST_ROUTES);
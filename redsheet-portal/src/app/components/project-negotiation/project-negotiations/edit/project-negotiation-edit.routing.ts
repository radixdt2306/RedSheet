import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectNegotiationEditComponent } from './project-negotiation-edit.component'

const PROJECT_NEGOTIATION_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectNegotiationEditComponent
}];

export const PROJECT_NEGOTIATION_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIATION_EDIT_ROUTES);
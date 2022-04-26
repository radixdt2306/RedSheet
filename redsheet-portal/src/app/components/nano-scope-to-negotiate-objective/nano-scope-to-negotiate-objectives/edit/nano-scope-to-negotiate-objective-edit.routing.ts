import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { NanoScopeToNegotiateObjectiveEditComponent } from './nano-scope-to-negotiate-objective-edit.component'

const NANO_SCOPE_TO_NEGOTIATE_OBJECTIVE_EDIT_ROUTES: Routes = [{
    path: '', component: NanoScopeToNegotiateObjectiveEditComponent
}];

export const NANO_SCOPE_TO_NEGOTIATE_OBJECTIVE_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(NANO_SCOPE_TO_NEGOTIATE_OBJECTIVE_EDIT_ROUTES);
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LanguagesComponent } from './languages.component';

const LANGUAGES_ROUTES: Routes = [{
    path: '', component: LanguagesComponent
},
];

export const LANGUAGES_ROUTING : ModuleWithProviders = RouterModule.forChild(LANGUAGES_ROUTES);
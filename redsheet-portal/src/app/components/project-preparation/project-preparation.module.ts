import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_PREPARATION_ROUTING } from './project-preparation.routing';

@NgModule({
    imports: [PROJECT_PREPARATION_ROUTING],
    exports: [RouterModule]
})
export class ProjectPreparationModule { }

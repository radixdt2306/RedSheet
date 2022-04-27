import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_REQUIREMENT_ROUTING } from './project-requirement.routing';

@NgModule({
    imports: [PROJECT_REQUIREMENT_ROUTING],
    exports: [RouterModule]
})
export class ProjectRequirementModule { }

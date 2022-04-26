import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_CULTURE_PLAN_ROUTING } from './project-culture-plan.routing';

@NgModule({
    imports: [PROJECT_CULTURE_PLAN_ROUTING],
    exports: [RouterModule]
})
export class ProjectCulturePlanModule { }

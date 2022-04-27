import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_CULTURE_PLANS_ROUTING } from './project-culture-plans.routing';
import { ProjectCulturePlansService } from './project-culture-plans.service';

@NgModule({
    imports: [PROJECT_CULTURE_PLANS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectCulturePlansService]
})
export class ProjectCulturePlansModule { }
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_REQUIREMENTS_ROUTING } from './project-requirements.routing';
import { ProjectRequirementsService } from './project-requirements.service';

@NgModule({
    imports: [PROJECT_REQUIREMENTS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectRequirementsService]
})
export class ProjectRequirementsModule { }
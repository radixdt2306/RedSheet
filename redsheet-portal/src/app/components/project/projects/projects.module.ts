import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECTS_ROUTING } from './projects.routing';
import { ProjectsService } from './projects.service';

@NgModule({
    imports: [PROJECTS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectsService]
})
export class ProjectsModule { }
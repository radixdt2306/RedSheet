import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_CULTURES_ROUTING } from './project-cultures.routing';
import { ProjectCulturesService } from './project-cultures.service';

@NgModule({
    imports: [PROJECT_CULTURES_ROUTING],
    exports: [RouterModule],
    providers: [ProjectCulturesService]
})
export class ProjectCulturesModule { }
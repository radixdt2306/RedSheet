import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_PREPARATIONS_ROUTING } from './project-preparations.routing';
import { ProjectPreparationsService } from './project-preparations.service';

@NgModule({
    imports: [PROJECT_PREPARATIONS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectPreparationsService]
})
export class ProjectPreparationsModule { }
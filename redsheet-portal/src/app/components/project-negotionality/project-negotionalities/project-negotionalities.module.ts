import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_NEGOTIONALITIES_ROUTING } from './project-negotionalities.routing';
import { ProjectNegotionalitiesService } from './project-negotionalities.service';

@NgModule({
    imports: [PROJECT_NEGOTIONALITIES_ROUTING],
    exports: [RouterModule],
    providers: [ProjectNegotionalitiesService]
})
export class ProjectNegotionalitiesModule { }
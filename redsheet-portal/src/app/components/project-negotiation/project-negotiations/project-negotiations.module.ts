import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_NEGOTIATIONS_ROUTING } from './project-negotiations.routing';
import { ProjectNegotiationsService } from './project-negotiations.service';

@NgModule({
    imports: [PROJECT_NEGOTIATIONS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectNegotiationsService]
})
export class ProjectNegotiationsModule { }
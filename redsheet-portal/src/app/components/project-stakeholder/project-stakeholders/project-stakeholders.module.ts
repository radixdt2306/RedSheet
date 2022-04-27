import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_STAKEHOLDERS_ROUTING } from './project-stakeholders.routing';
import { ProjectStakeholdersService } from './project-stakeholders.service';

@NgModule({
    imports: [PROJECT_STAKEHOLDERS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectStakeholdersService]
})
export class ProjectStakeholdersModule { }
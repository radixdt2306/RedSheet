import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_OUTCOME_AND_LEARNINGS_ROUTING } from './project-outcome-and-learnings.routing';
import { ProjectOutcomeAndLearningsService } from './project-outcome-and-learnings.service';

@NgModule({
    imports: [PROJECT_OUTCOME_AND_LEARNINGS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectOutcomeAndLearningsService]
})
export class ProjectOutcomeAndLearningsModule { }
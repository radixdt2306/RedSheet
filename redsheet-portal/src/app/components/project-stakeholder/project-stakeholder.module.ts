import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_STAKEHOLDER_ROUTING } from './project-stakeholder.routing';

@NgModule({
    imports: [PROJECT_STAKEHOLDER_ROUTING],
    exports: [RouterModule]
})
export class ProjectStakeholderModule { }

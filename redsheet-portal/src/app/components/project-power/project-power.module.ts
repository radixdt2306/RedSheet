import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_POWER_ROUTING } from './project-power.routing';

@NgModule({
    imports: [PROJECT_POWER_ROUTING],
    exports: [RouterModule]
})
export class ProjectPowerModule { }

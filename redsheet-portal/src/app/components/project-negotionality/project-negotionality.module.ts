import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_NEGOTIONALITY_ROUTING } from './project-negotionality.routing';

@NgModule({
    imports: [PROJECT_NEGOTIONALITY_ROUTING],
    exports: [RouterModule]
})
export class ProjectNegotionalityModule { }

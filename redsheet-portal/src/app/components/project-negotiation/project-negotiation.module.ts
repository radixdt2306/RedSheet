import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_NEGOTIATION_ROUTING } from './project-negotiation.routing';

@NgModule({
    imports: [PROJECT_NEGOTIATION_ROUTING],
    exports: [RouterModule]
})
export class ProjectNegotiationModule { }

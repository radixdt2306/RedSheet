import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_ROUTING } from './project.routing';

@NgModule({
    imports: [PROJECT_ROUTING],
    exports: [RouterModule]
})
export class ProjectModule { }

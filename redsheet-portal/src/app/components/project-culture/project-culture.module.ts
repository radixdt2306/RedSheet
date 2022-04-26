import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_CULTURE_ROUTING } from './project-culture.routing';

@NgModule({
    imports: [PROJECT_CULTURE_ROUTING],
    exports: [RouterModule]
})
export class ProjectCultureModule { }

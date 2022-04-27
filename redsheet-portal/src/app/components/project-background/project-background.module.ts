import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_BACKGROUND_ROUTING } from './project-background.routing';

@NgModule({
    imports: [PROJECT_BACKGROUND_ROUTING],
    exports: [RouterModule]
})
export class ProjectBackgroundModule { }

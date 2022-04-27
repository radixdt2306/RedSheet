import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_BACKGROUNDS_ROUTING } from './project-backgrounds.routing';
import { ProjectBackgroundsService } from './project-backgrounds.service';

@NgModule({
    imports: [PROJECT_BACKGROUNDS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectBackgroundsService]
})
export class ProjectBackgroundsModule { }
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_POWERS_ROUTING } from './project-powers.routing';
import { ProjectPowersService } from './project-powers.service';

@NgModule({
    imports: [PROJECT_POWERS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectPowersService]
})
export class ProjectPowersModule { }
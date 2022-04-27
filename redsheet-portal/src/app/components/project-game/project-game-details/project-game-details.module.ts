import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { PROJECT_GAME_DETAILS_ROUTING } from './project-game-details.routing';
import { ProjectGameDetailsService } from './project-game-details.service';

@NgModule({
    imports: [PROJECT_GAME_DETAILS_ROUTING],
    exports: [RouterModule],
    providers: [ProjectGameDetailsService]
})
export class ProjectGameDetailsModule { }
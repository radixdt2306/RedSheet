import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_GAME_ROUTING } from './project-game.routing';

@NgModule({
    imports: [PROJECT_GAME_ROUTING],
    exports: [RouterModule]
})
export class ProjectGameModule { }

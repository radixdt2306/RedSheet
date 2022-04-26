import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { ProjectGameDetailEditComponent } from './project-game-detail-edit.component'
import { PROJECT_GAME_DETAIL_EDIT_ROUTING } from './project-game-detail-edit.routing'
import {ProjectGameDetailsService } from "../project-game-details.service";
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'
import { GamesSharedComponentModule } from 'app/components/project-game/games/games-shared-component.module'

@NgModule({
    imports: [
        PROJECT_GAME_DETAIL_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule,FormsModule, ReactiveFormsModule,
		ProjectModulesSharedComponentModule, GamesSharedComponentModule,     ],
    declarations: [ProjectGameDetailEditComponent ],
    exports: [RouterModule],
    providers: [ProjectGameDetailsService]
})
export class ProjectGameDetailEditModule { }
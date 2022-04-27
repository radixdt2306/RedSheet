import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { GameListComponent } from './list/game-list.component'
import {GamesService } from "./games.service";
import {GAMES_SHARED_COMPONENT_CONTAINER } from './games-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ GameListComponent, ],
    providers: [GamesService ],
    exports: [RouterModule, GameListComponent, ]
})
export class GamesSharedComponentModule { }
DynamicComponentContainer.register(GAMES_SHARED_COMPONENT_CONTAINER );
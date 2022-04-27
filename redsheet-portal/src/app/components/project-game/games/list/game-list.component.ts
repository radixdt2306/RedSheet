import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { Game } from 'app/database-models';
import { GamesService } from '../games.service';
import { GameDomain } from '../domain/game.domain';


@Component({
    selector:'app-game-list',
    templateUrl: './game-list.component.html',
})
export class GameListComponent extends GameDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    games: Game[];
    listSubscription: Subscription;
    
	@Input()  projectGameDetailId :number;

    constructor(
        private gamesService: GamesService,    
        private dialog: RxDialog,
		private router: Router,
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.gamesService.get(this.projectGameDetailId).subscribe(games => {
            this.games = games;
            this.showComponent = true;
        });
    }



    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectGameDetail, vProjectGameDetailRecord, Game, vGameRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectGameDetailsService } from '../project-game-details.service';
import { ProjectGameDetailDomain } from '../domain/project-game-detail.domain';
import { ProjectGameDetailLookupGroup } from '../domain/project-game-detail.models';
import { GAME_TYPES } from 'app/database-collections';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { GameListComponent } from 'app/components/project-game/games/list/game-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, GAME_CONST } from 'app/const';
import { ApplicationBroadcaster, ApplicationConfiguration } from '@rx/core';
import { forEach } from '@angular/router/src/utils/collection';
import { FormArray } from '@angular/forms/src/model';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-game-detail-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, GameListComponent, ProjectModuleHelpDetailComponent,]

})
export class ProjectGameDetailEditComponent extends ProjectGameDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectGameDetailFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    deleteSubscription: Subscription;
    projectGameDetailLookupGroup: ProjectGameDetailLookupGroup;;
    projectGameDetailId: number;
    projectModuleId: number;
    className: any[];
    placeholderText: string;
    playPlaceholderText: any[] = [];
    triggerPlaceholderText: any[] = [];
    gameindex: number;
    private game_types: any;
    validMessageGamePlay: ValidMessage[] = [];
    validMessageGameTrigger: ValidMessage[] = [];

    validMessageNotes: ValidMessage;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectGameDetailsService: ProjectGameDetailsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectGameDetailId = param['projectGameDetailId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.projectGameDetailsService.getBy([this.projectGameDetailId]).subscribe(
            (response: any) => {
                this.game_types = GAME_TYPES;
                this.className = [
                    {
                        gameTypeId: 63,
                        className: 'redsheet redsheet-chicken'
                    },
                    {
                        gameTypeId: 64,
                        className: 'redsheet redsheet-trust'
                    },
                    {
                        gameTypeId: 65,
                        className: 'redsheet redsheet-prisoner'
                    },
                    {
                        gameTypeId: 66,
                        className: 'redsheet redsheet-stag'
                    },
                ];
                for (var j: number = 0; j < this.game_types.length; j++) {
                    for (var i: number = 0; i < this.className.length; i++) {
                        if (this.game_types[j].gameTypeId == this.className[i].gameTypeId) {
                            this.game_types[j]["className"] = this.className[i].className;
                        }
                    }
                }
                var projectGameDetail = new ProjectGameDetail();
                if (this.projectGameDetailId == 0) {
                    projectGameDetail.projectModuleId = this.projectModuleId;
                    projectGameDetail.notes = "";
                    projectGameDetail.currentGameId = 0;
                    projectGameDetail.theirCurrentGameId = 0;
                    projectGameDetail.theirEventGameId = 0;

                    projectGameDetail.games = new Array<Game>();

                    var gameOne = new Game();
                    gameOne.play = null;
                    gameOne.trigger = null;
                    gameOne.projectGameDetailId = 0;
                    gameOne.gameTypeId = -1;
                    projectGameDetail.games.push(gameOne);

                    this.projectGameDetailFormGroup = this.validation.getFormGroup(projectGameDetail);

                }
                else {
                    projectGameDetail.currentGameId = response.currentGameId;
                    projectGameDetail.notes = response.notes;
                    projectGameDetail.projectGameDetailId = response.projectGameDetailId;
                    projectGameDetail.projectModuleId = response.projectModuleId;
                    projectGameDetail.theirCurrentGameId = response.theirCurrentGameId;
                    projectGameDetail.theirEventGameId = response.theirEventGameId;
                    projectGameDetail.games = response.games;
                    this.projectGameDetailFormGroup = this.validation.getFormGroup(projectGameDetail);
                    this.projectGameDetailFormGroup.controls.projectGameDetailId.setValue(this.projectGameDetailId);
                    this.projectGameDetailFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
                }

                this.validMessageNotes = new ValidMessage();

                if (this.projectGameDetailFormGroup.controls.notes.value == null)
                    this.projectGameDetailFormGroup.controls.notes.setValue('');

                this.onSearchChangeNotes(this.projectGameDetailFormGroup.controls.notes.value,
                    this.projectGameDetailFormGroup.controls.notes.value == '' ? true : false);
                

                let index = 0;
                projectGameDetail.games.forEach(game => {
                    this.validMessageGamePlay.push(new ValidMessage());
                    this.onSearchChangeGamePlay(game.play, index, false);

                    this.validMessageGameTrigger.push(new ValidMessage());
                    this.onSearchChangeGameTrigger(game.play, index, false);
                    index++;
                })

                this.showComponent = true;
                //console.log(this.projectGameDetailFormGroup)
            });


    }

    addProjectGameDetail(): void {
        this.addSubscription = this.projectGameDetailsService.post(this.projectGameDetailFormGroup.value).subscribe(t => {
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-game/${this.projectModuleId}/project-game-details/${t.projectGameDetailId}`, filterText: GAME_CONST.value });
            this.projectGameDetailFormGroup.controls.projectGameDetailId.setValue(t.projectGameDetailId);
            this.router.navigate(["project-game", this.projectModuleId, "project-game-details", t.projectGameDetailId]);
            this.projectGameDetailFormGroup.controls.games.setValue(t.games);
        },
            error => {
                // var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                // if (maxLength) {
                //     maxLength = maxLength.replace("#n#", 1000)
                //     this.toast.show(maxLength, { status: 'error' });
                // }
                this.toast.show(error, { status: 'error' });
            })
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    getRationalePlaceholder(gameTypeId) {
        this.projectGameDetailFormGroup.controls.theirEventGameId.setValue(gameTypeId);
        this.projectGameDetailsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
            if (result != "") {
                let cultureBehaviour = result.ProjectCultures[0].IsMonochronic;
                this.rationalePlaceholder(cultureBehaviour, gameTypeId);
            }
            else {
                this.toast.show("Please enter culture details.", { status: 'error' });
            }
        });
    }

    rationalePlaceholder(cultureBehaviour: Boolean, gameType: number) {
        this.game_types = GAME_TYPES;
        if (cultureBehaviour == true) {
            switch (gameType) {
                case this.game_types[0].gameTypeId:
                    this.placeholderText = "You should expect this game to be played at some stage.";
                    break;
                case this.game_types[1].gameTypeId:
                    this.placeholderText = "This is only likely if there is mutual understanding and the success will depend on the individual.";
                    break;
                case this.game_types[2].gameTypeId:
                    this.placeholderText = "It is a possible so watch out for any indicators.";
                    break;
                case this.game_types[3].gameTypeId:
                    this.placeholderText = "Take care as this also might be prisoners dilemma being used.";
                    break;
                default:
                    this.placeholderText = "";
            }
        }
        else {
            switch (gameType) {
                case this.game_types[0].gameTypeId:
                    this.placeholderText = "They may consider this approach if there is no strong relationship. Take care though you could end up in prisoner’s dilemma.";
                    break;
                case this.game_types[1].gameTypeId:
                    this.placeholderText = "With a strong relationship this is a highly likely approach.";
                    break;
                case this.game_types[2].gameTypeId:
                    this.placeholderText = "Will not be played if there is a relationship.  With no relationship it is likely to be the game of choice.";
                    break;
                case this.game_types[3].gameTypeId:
                    this.placeholderText = "This is the typical approach used when the relationship is strong.";
                    break;
                default:
                    this.placeholderText = "";
            }
        }
    }

    getGamePlaceholder(gameTypeId, numGame) {
        var rowIndex = numGame + 1;
        this.game_types = GAME_TYPES;
        switch (rowIndex) {
            case 1:
                this.gamePlaceholder(gameTypeId, numGame);
                break;
            case 2:
                this.gamePlaceholder(gameTypeId, numGame);
                break;
            case 3:
                this.gamePlaceholder(gameTypeId, numGame);
                break;
            case 4:
                this.gamePlaceholder(gameTypeId, numGame);
                break;

        }
    }

    gamePlaceholder(gameType: number, numGame: number) {
        if (gameType == this.game_types[0].gameTypeId) {
            this.playPlaceholderText[numGame] = "You are value claiming so it will be high stakes win or lose.  Have a clear BATNA or be prepared to switch of it is not going your way.";
            this.triggerPlaceholderText[numGame] = "No progress is being made and the other party is standing their ground.";
        }
        else if (gameType == this.game_types[1].gameTypeId) {
            this.playPlaceholderText[numGame] = "Create a favor/gift situation. Value creating if your opponent has the power, value claiming if they choose not to return the favor is the strategy.";
            this.triggerPlaceholderText[numGame] = "When a concession is asked for."
        }
        else if (gameType == this.game_types[2].gameTypeId) {
            this.playPlaceholderText[numGame] = "Make a judgement call based on what you know about them.";
            this.triggerPlaceholderText[numGame] = "When the reasonable trade-off is not being accepted by your opponent.";
        }
        else if (gameType == this.game_types[3].gameTypeId) {
            this.playPlaceholderText[numGame] = "Work together unless your value objective is claim.";
            this.triggerPlaceholderText[numGame] = "When you feel it is becoming prisoner’s dilemma.";
        }
    }

    editProjectGameDetail(): void {
        if (this.projectGameDetailId == 0) {
            this.addProjectGameDetail();
        }
        else {
            this.editSubscription = this.projectGameDetailsService.put(this.projectGameDetailFormGroup.value).subscribe(t => {
                this.projectGameDetailFormGroup.controls.games.setValue(t.games);
            },
                error => {
                    // var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                    // if (maxLength) {
                    //     maxLength = maxLength.replace("#n#", 1000)
                    //     this.toast.show(maxLength, { status: 'error' });
                    // }
                    this.toast.show(error, { status: 'error' });
                })
        }

    }

    addGames(): void {
        var gameOne = new Game();
        gameOne.projectGameDetailId = 0;
        gameOne.play = null;
        gameOne.trigger = null;
        gameOne.gameTypeId = -1;

        if ((<FormArray>this.projectGameDetailFormGroup.controls['games']).length < 4) {
            this.validMessageGamePlay.push(new ValidMessage());
            this.onSearchChangeGamePlay('', (<FormArray>this.projectGameDetailFormGroup.controls['games']).length, true);

            this.validMessageGameTrigger.push(new ValidMessage());
            this.onSearchChangeGameTrigger('', (<FormArray>this.projectGameDetailFormGroup.controls['games']).length, true);

            (<FormArray>this.projectGameDetailFormGroup.controls['games']).push(this.validation.getFormGroup(gameOne));
            this.router.navigate(["project-game", this.projectModuleId, "project-game-details", this.projectGameDetailId])
        }
        else {
            this.toast.show("You can't add more than 4 Games", { status: 'error' })
        }


    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectGameDetailFormGroup.dirty;
    }

    showGameDeleteComponent(index, projectGameDetailId: number, gameId: number): void {
        this.validMessageGamePlay.splice(index - 1, 1);
        if (projectGameDetailId == 0) {
            (<FormArray>this.projectGameDetailFormGroup.controls['games']).removeAt(index - 1);
        }
        else {
            this.dialog.confirmation([index], "delete").then(dialogClick => {

                if (dialogClick == DialogClick.PrimaryOk) {
                    this.deleteSubscription = this.projectGameDetailsService.delete(gameId).subscribe(t => {
                        this.deleteSubscription.unsubscribe();
                        (<FormArray>this.projectGameDetailFormGroup.controls['games']).removeAt(index - 1);
                    }, error => {
                        for (var key in error)
                            this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                    });
                }
            });
        }
    }

    checkValidation(): boolean {
        
        var isValid: boolean = true;
        var games = (<FormArray>(this.projectGameDetailFormGroup.controls['games'])).controls;
        for (let i = 0; i < games.length; i++) {
            var gameControls = <FormArray>(games[i]);
            if (gameControls.controls["play"].value.trim() == '' || gameControls.controls["trigger"].value.trim() == '' || gameControls.controls["trigger"].value.length > 150 || gameControls.controls["play"].value.length > 150) {
                isValid = false;
            }
        }
        return isValid;
    }

    chkPReqvalidation(num: number): boolean {
        
        var isValid: boolean = false;
        var games = (<FormArray>(this.projectGameDetailFormGroup.controls['games'])).controls;
        var gameControls = <FormArray>(games[num]);
       
            if ((gameControls.controls["play"].value == undefined || gameControls.controls["play"].value == null || (gameControls.controls["play"].value && gameControls.controls["play"].value.trim()) == '') && (gameControls.controls["play"].dirty || gameControls.controls["play"].touched)) {
                isValid = true;
            }
      

        return isValid;
    }

    chkTReqvalidation(num: number): boolean {
        
        var isValid: boolean = false;
        var games = (<FormArray>(this.projectGameDetailFormGroup.controls['games'])).controls;
        var gameControls = <FormArray>(games[num]);
        
            if ((gameControls.controls["trigger"].value == undefined || gameControls.controls["trigger"].value == null || (gameControls.controls["trigger"].value && gameControls.controls["trigger"].value.trim()) == '') && (gameControls.controls["trigger"].dirty || gameControls.controls["trigger"].touched)) {
                isValid = true;
            }
       

        return isValid;
    }

    onSearchChangeGamePlay(value, rowIndex, isFirstTime: boolean = false) {

        this.validMessageGamePlay[rowIndex] = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeGameTrigger(value, rowIndex, isFirstTime: boolean = false) {

        this.validMessageGameTrigger[rowIndex] = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeNotes(value, isFirstTime: boolean = false) {

        this.validMessageNotes = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

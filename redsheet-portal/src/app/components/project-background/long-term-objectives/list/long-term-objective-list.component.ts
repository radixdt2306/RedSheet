import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick } from '@rx/view';

import { vLongTermObjective, LongTermObjective } from 'app/database-models';
import { LongTermObjectivesService } from '../long-term-objectives.service';
import { LongTermObjectiveDomain } from '../domain/long-term-objective.domain';
import { ApplicationConfiguration } from "@rx/core"
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    selector: 'app-long-term-objective-list',
    templateUrl: './long-term-objective-list.component.html',
})
export class LongTermObjectiveListComponent extends LongTermObjectiveDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    longTermObjectives: vLongTermObjective[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectBackgroundId: number;
    @Input() isLocked: boolean;
    isAdd: boolean = false;
    editRowIndex: number;
    editLongTermObjective: vLongTermObjective;
    addLongTermObjectiveEntity: vLongTermObjective;
    showSave: boolean = false;
    validMessagelongTermObjectiveValue: ValidMessage;
    validMessageTermObjectiveValue:ValidMessage;

    constructor(
        private longTermObjectivesService: LongTermObjectivesService,
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) {
        super();
        this.editLongTermObjective = new vLongTermObjective();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.longTermObjectivesService.get(this.projectBackgroundId).subscribe(longTermObjectives => {
            this.longTermObjectives = longTermObjectives;

            this.validMessagelongTermObjectiveValue = new ValidMessage();

            this.onSearchChangelongTermObjectiveValue('', true);
            this.showComponent = true;
        });
    }


    showEditRecord(longTermObjective: vLongTermObjective, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editLongTermObjective = new vLongTermObjective(longTermObjective);
        this.showSave = true;
        this.onSearchChangeEditlongTermObjectiveValue(longTermObjective.longTermObjectiveValue, false);
    }


    updateLongTermObjective(longTermObjective: LongTermObjective): void {
        if (longTermObjective.longTermObjectiveValue.length > 0) {
            if (longTermObjective && longTermObjective.longTermObjectiveValue && longTermObjective.longTermObjectiveValue.length <= 100) {
                if (longTermObjective.longTermObjectiveId != 0) {
                    this.longTermObjectivesService.put(this.projectBackgroundId, longTermObjective).subscribe(t => {
                        this.longTermObjectives[this.editRowIndex].longTermObjectiveValue = longTermObjective.longTermObjectiveValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                        this.toast.show(error.LongTermObjectiveValue, { status: 'error' });
                    })
                }
                else {
                    this.longTermObjectivesService.post(this.projectBackgroundId, longTermObjective).subscribe(t => {
                        this.longTermObjectives.push(this.addLongTermObjectiveEntity);
                        this.longTermObjectives[this.longTermObjectives.length - 1].longTermObjectiveId = t.longTermObjectiveId;
                        this.isAdd = false;
                    }, error => {
                        this.toast.show(error.LongTermObjectiveValue, { status: 'error' });
                    })
                    this.editRowIndex = null;
                    this.showSave = true;
                    // this.saveFlag = true;
                }
            } else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 100)
                    this.toast.show(maxLength, { status: 'error' });
                }

            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    addLongTermObjective(rowIndex: number): void {
        this.addLongTermObjectiveEntity = new LongTermObjective();
        this.addLongTermObjectiveEntity.longTermObjectiveId = 0;
        this.addLongTermObjectiveEntity.longTermObjectiveValue = "";
        this.addLongTermObjectiveEntity.projectBackgroundId = this.projectBackgroundId;
        this.isAdd = true;
        // this.longTermObjectives.push(longTermObjective);
        // this.showEditRecord(longTermObjective,this.longTermObjectives.length-1);
    }


    // deleteLongTermObjective(longTermObjective: vLongTermObjective, rowIndex: number){
    //     this.longTermObjectivesService.delete(this.projectBackgroundId,longTermObjective.longTermObjectiveId).subscribe(t => {
    //         this.longTermObjectives.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }

    showLongTermObjectiveDeleteComponent(longTermObjective: vLongTermObjective, rowIndex: number): void {
        this.dialog.confirmation([longTermObjective.longTermObjectiveValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.longTermObjectivesService.delete(this.projectBackgroundId, longTermObjective.longTermObjectiveId).subscribe(t => {
                    this.longTermObjectives.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }
    onSearchChangeEditlongTermObjectiveValue(value, isFirstTime: boolean = false){
        
        this.validMessageTermObjectiveValue = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangelongTermObjectiveValue(value, isFirstTime: boolean = false) {
        
        this.validMessagelongTermObjectiveValue = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}

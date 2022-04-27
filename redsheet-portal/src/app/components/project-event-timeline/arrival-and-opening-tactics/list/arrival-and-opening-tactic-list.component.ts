import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vArrivalAndOpeningTactic, ArrivalAndOpeningTactic } from 'app/database-models';
import { ArrivalAndOpeningTacticsService } from '../arrival-and-opening-tactics.service';
import { ArrivalAndOpeningTacticDomain } from '../domain/arrival-and-opening-tactic.domain';
import { ApplicationConfiguration } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-arrival-and-opening-tactic-list',
    templateUrl: './arrival-and-opening-tactic-list.component.html',
})
export class ArrivalAndOpeningTacticListComponent extends ArrivalAndOpeningTacticDomain implements OnInit, OnDestroy {
    isAdd:boolean = false;
    editRowIndex: number;
    editArrivalAndOpeningTactic: vArrivalAndOpeningTactic;
    addArrivalAndOpeningTacticEntity:vArrivalAndOpeningTactic;
    showSave: boolean = false;
    showComponent: boolean = false;
    arrivalAndOpeningTactics: vArrivalAndOpeningTactic[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    validMessageAddAOTE: ValidMessage;
    validMessageAOTE: ValidMessage;
    
    @Input() isLocked:boolean;
	@Input()  projectEventTimelineId :number;

    constructor(
        private arrivalAndOpeningTacticsService: ArrivalAndOpeningTacticsService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.arrivalAndOpeningTacticsService.get(this.projectEventTimelineId).subscribe(arrivalAndOpeningTactics => {
            this.validMessageAddAOTE = new ValidMessage();
            this.onSearchChangeAddAOTE('', true);
            this.validMessageAOTE = new ValidMessage();

            this.arrivalAndOpeningTactics = arrivalAndOpeningTactics;
            this.showComponent = true;
        });
    }

    
    showEditRecord(ArrivalAndOpeningTactic: vArrivalAndOpeningTactic, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editArrivalAndOpeningTactic = new vArrivalAndOpeningTactic(ArrivalAndOpeningTactic);
        this.showSave = true;
        this.onSearchChangeAOTE(ArrivalAndOpeningTactic.arrivalAndOpeningTacticValue, false);
    }
  

    updateArrivalAndOpeningTactic(arrivalAndOpeningTactic: ArrivalAndOpeningTactic): void {
        if (arrivalAndOpeningTactic.arrivalAndOpeningTacticValue.length > 0) {
            if (ArrivalAndOpeningTactic && arrivalAndOpeningTactic.arrivalAndOpeningTacticValue && arrivalAndOpeningTactic.arrivalAndOpeningTacticValue.length <= 200) {
                if (arrivalAndOpeningTactic.arrivalAndOpeningTacticId != 0) {
                    this.arrivalAndOpeningTacticsService.put(this.projectEventTimelineId, arrivalAndOpeningTactic).subscribe(t => {
                        this.arrivalAndOpeningTactics[this.editRowIndex].arrivalAndOpeningTacticValue = arrivalAndOpeningTactic.arrivalAndOpeningTacticValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                        this.toast.show(error.ArrivalAndOpeningTacticValue, { status: 'error' });
                    })
                }
                else {
                    this.arrivalAndOpeningTacticsService.post(this.projectEventTimelineId, arrivalAndOpeningTactic).subscribe(t => {
                        this.arrivalAndOpeningTactics.push(this.addArrivalAndOpeningTacticEntity);
                        this.arrivalAndOpeningTactics[this.arrivalAndOpeningTactics.length - 1].arrivalAndOpeningTacticId = t.arrivalAndOpeningTacticId;
                        this.isAdd = false;
                    }, error => {
                        this.toast.show(error.ArrivalAndOpeningTacticValue, { status: 'error' });
                    })
                    this.editRowIndex = null;
                    this.showSave = true;
                    // this.saveFlag = true;
                }
            } else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 200)
                    this.toast.show(maxLength, { status: 'error' });
                }
            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    addArrivalAndOpeningTactic(rowIndex: number): void {
            this.addArrivalAndOpeningTacticEntity = new ArrivalAndOpeningTactic();
            this.addArrivalAndOpeningTacticEntity.arrivalAndOpeningTacticId =0;
            this.addArrivalAndOpeningTacticEntity.arrivalAndOpeningTacticValue= "";
            this.addArrivalAndOpeningTacticEntity.projectEventTimelineId = this.projectEventTimelineId;
            this.isAdd = true;
            // this.ArrivalAndOpeningTactics.push(ArrivalAndOpeningTactic);
            // this.showEditRecord(ArrivalAndOpeningTactic,this.ArrivalAndOpeningTactics.length-1);
    }
       
         
    // deleteArrivalAndOpeningTactic(ArrivalAndOpeningTactic: vArrivalAndOpeningTactic, rowIndex: number){
    //     this.arrivalAndOpeningTacticsService.delete(this.projectEventTimelineId,ArrivalAndOpeningTactic.arrivalAndOpeningTacticId).subscribe(t => {
    //         this.arrivalAndOpeningTactics.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }

    showArrivalAndOpeningTacticDeleteComponent(arrivalAndOpeningTactic: vArrivalAndOpeningTactic, rowIndex: number): void 
    {
        this.dialog.confirmation([arrivalAndOpeningTactic.arrivalAndOpeningTacticValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.arrivalAndOpeningTacticsService.delete(this.projectEventTimelineId, arrivalAndOpeningTactic.arrivalAndOpeningTacticId).subscribe(t => {
                    this.arrivalAndOpeningTactics.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    onSearchChangeAddAOTE(value, isFirstTime: boolean = false) {
        
        this.validMessageAddAOTE = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeAOTE(value, isFirstTime: boolean = false) {
        
        this.validMessageAOTE = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

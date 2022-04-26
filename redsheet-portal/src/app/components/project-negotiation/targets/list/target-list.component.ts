import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vTarget,Target } from 'app/database-models';
import { TargetsService } from '../targets.service';
import { TargetDomain } from '../domain/target.domain';
import { ApplicationConfiguration} from "@rx/core"
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-target-list',
    templateUrl: './target-list.component.html',
})
export class TargetListComponent extends TargetDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    targets: vTarget[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() isLocked:boolean;
    @Input()  projectNegotiationId :number;
    isAdd:boolean = false;
    editRowIndex: number;
    editTarget: vTarget;
    addTargetEntity:vTarget;
    showSave: boolean = false;
    validMessageAddTargetDetails: ValidMessage;
    validMessageTargetDetails: ValidMessage;

    constructor(
        private targetsService: TargetsService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) {
         super();
         this.editTarget = new vTarget();
      }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.targetsService.get(this.projectNegotiationId).subscribe(targets => {
            this.targets = targets;
            this.validMessageAddTargetDetails = new ValidMessage();
            this.onSearchChangeAddTargetDetails('', true);
            this.validMessageTargetDetails = new ValidMessage();
            
            this.showComponent = true;
        });
    }

    
    showEditRecord(target: vTarget, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editTarget = new vTarget(target);
        this.showSave = true;
        this.onSearchChangeTargetDetails(target.targetDetail, false);
    }
  

    updateTarget(target: Target): void {
        if(target.targetDetail.length > 0){
        if(target && target.targetDetail && target.targetDetail.length <=200){
            if(target.targetId!=0){
                
                    this.targetsService.put(this.projectNegotiationId, target).subscribe(t => {
                        this.targets[this.editRowIndex ].targetDetail = target.targetDetail;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.TargetDetail, {status: 'error'});
                    })
                 
                }
                else{
                this.targetsService.post(this.projectNegotiationId, target).subscribe(t => {
                    this.targets.push(this.addTargetEntity);
                    this.targets[ this.targets.length-1].targetId = t.targetId;
                    this.isAdd = false;
                }, error => {
                    this.toast.show(error.TargetDetail, {status: 'error'});
                })
                this.editRowIndex = null;
                this.showSave = true;
                // this.saveFlag = true;
            }
        }else{
            var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
            if(maxLength){
                maxLength = maxLength.replace("#n#",200)
                this.toast.show(maxLength,{status:'error'});
            }

        }
    }
    else{
        this.toast.show("Please enter details", {status:"error"});
    }
    }


    addTarget(rowIndex: number): void {
        this.addTargetEntity = new Target();
        this.addTargetEntity.targetId =0;
        this.addTargetEntity.targetDetail= "";
        this.addTargetEntity.projectNegotiationId = this.projectNegotiationId;
        this.isAdd = true;
    
}

    // deleteTarget(target: vTarget, rowIndex: number){
    //     this.targetsService.delete(this.projectNegotiationId,target.targetId).subscribe(t => {
    //         this.targets.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }
    showTargetDeleteComponent(target: vTarget, rowIndex: number): void 
    {
        this.dialog.confirmation([target.targetDetail], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.targetsService.delete(this.projectNegotiationId, target.targetId).subscribe(t => {
                    this.targets.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    onSearchChangeAddTargetDetails(value, isFirstTime: boolean = false) {
        
        this.validMessageAddTargetDetails = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeTargetDetails(value, isFirstTime: boolean = false) {
        
        this.validMessageTargetDetails = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

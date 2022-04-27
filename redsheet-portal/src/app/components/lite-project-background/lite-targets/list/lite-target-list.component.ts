import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vLiteTarget, LiteTarget } from 'app/database-models';
import { LiteTargetsService } from '../lite-targets.service';
import { LiteTargetDomain } from '../domain/lite-target.domain';
import { ApplicationConfiguration} from "@rx/core"

@Component({
    selector:'app-lite-target-list',
    templateUrl: './lite-target-list.component.html',
})
export class LiteTargetListComponent extends LiteTargetDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteTargets: vLiteTarget[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() isLocked:boolean;
    @Input()  liteProjectBackgroundId :number;
    isAdd:boolean = false;
    editRowIndex: number;
    editLiteTarget: vLiteTarget;
    addLiteTargetEntity:vLiteTarget;
    showSave: boolean = false;
	

    constructor(
        private liteTargetsService: LiteTargetsService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteTargetsService.get(this.liteProjectBackgroundId).subscribe(liteTargets => {
            this.liteTargets = liteTargets;
            this.showComponent = true;
        });
    }


    
    showEditRecord(liteTarget: vLiteTarget, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editLiteTarget = new vLiteTarget(liteTarget);
        this.showSave = true;
    }
  

    updateLiteTarget(liteTarget: LiteTarget): void {
        if(liteTarget.liteTargetDetail.length > 0){
        if(liteTarget && liteTarget.liteTargetDetail && liteTarget.liteTargetDetail.length <=50){
            if(liteTarget.liteTargetId!=0){
                
                    this.liteTargetsService.put(this.liteProjectBackgroundId, liteTarget).subscribe(t => {
                        this.liteTargets[this.editRowIndex ].liteTargetDetail = liteTarget.liteTargetDetail;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.TargetDetail, {status: 'error'});
                    })
                 
                }
                else{
                this.liteTargetsService.post(this.liteProjectBackgroundId, liteTarget).subscribe(t => {
                    this.liteTargets.push(this.addLiteTargetEntity);
                    this.liteTargets[ this.liteTargets.length-1].liteTargetId = t.liteTargetId;
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
                maxLength = maxLength.replace("#n#",50)
                this.toast.show(maxLength,{status:'error'});
            }

        }
    }
    else{
        this.toast.show("Please enter details", {status:"error"});
    }
    }


    addLiteTarget(rowIndex: number): void {
        this.addLiteTargetEntity = new LiteTarget();
        this.addLiteTargetEntity.liteTargetId =0;
        this.addLiteTargetEntity.liteTargetDetail= "";
        this.addLiteTargetEntity.liteProjectBackgroundId = this.liteProjectBackgroundId;
        this.isAdd = true;
    
}

    showLiteTargetDeleteComponent(liteTarget: vLiteTarget, rowIndex: number): void 
    {
        this.dialog.confirmation([liteTarget.liteTargetDetail], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.liteTargetsService.delete(this.liteProjectBackgroundId, liteTarget.liteTargetId).subscribe(t => {
                    this.liteTargets.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
            
        super.destroy();
    }
}

import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { TheirBatna, vTheirBatna } from 'app/database-models';
import { TheirBatnasService } from '../their-batnas.service';
import { TheirBatnaDomain } from '../domain/their-batna.domain';
import { ApplicationConfiguration} from "@rx/core";
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-their-batna-list',
    templateUrl: './their-batna-list.component.html',
})
export class TheirBatnaListComponent extends TheirBatnaDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    theirBatnas: vTheirBatna[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    addTheirBatnaEntity:vTheirBatna;
    isAdd:boolean = false;
    editRowIndex: number;
    editTheirBatna: vTheirBatna;
    showSave: boolean = false;
    validMessageAddBatana: ValidMessage;
    validMessageBatana: ValidMessage;
    
    @Input()  projectRequirementId :number;    
    @Input() isLocked:boolean;
    constructor(
        private theirBatnasService: TheirBatnasService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast,
    ) { 
        super();
        this.editTheirBatna = new vTheirBatna();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.theirBatnasService.get(this.projectRequirementId).subscribe(theirBatnas => {
            
            this.validMessageAddBatana = new ValidMessage();
            this.onSearchChangeAddBatana('', true);
            this.validMessageBatana = new ValidMessage();

            this.theirBatnas = theirBatnas;
            this.showComponent = true;
        });
    }

    showEditRecord(theirBatna: vTheirBatna, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editTheirBatna = new vTheirBatna(theirBatna);
        this.showSave = true;
        this.onSearchChangeBatana(theirBatna.theirBatanValue, false);
    }
  

    updateTheirBatna(theirBatna: TheirBatna): void {
        if(theirBatna.theirBatanValue.length > 0){
        if(theirBatna && theirBatna.theirBatanValue && theirBatna.theirBatanValue.length <=400){
            if(theirBatna.theirBatnaId!=0){
                
                    this.theirBatnasService.put(this.projectRequirementId, theirBatna).subscribe(t => {
                        this.theirBatnas[this.editRowIndex ].theirBatanValue = theirBatna.theirBatanValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.TheirBatanValue, {status: 'error'});
                    })
                 
                }
                else{
                this.theirBatnasService.post(this.projectRequirementId, theirBatna).subscribe(t => {
                    this.theirBatnas.push(this.addTheirBatnaEntity);
                    this.theirBatnas[ this.theirBatnas.length-1].theirBatnaId = t.theirBatnaId;
                    this.isAdd = false;
                }, error => {
                    this.toast.show(error.TheirBatanValue, {status: 'error'});
                })
                this.editRowIndex = null;
                this.showSave = true;
            }
        }else{
            var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
            if(maxLength){
                maxLength = maxLength.replace("#n#",400)
                this.toast.show(maxLength,{status:'error'});
            }
        }
    }
    else{
        this.toast.show("Please enter details", {status:"error"});
    }
    }




    addTheirBatna(): void {
        this.addTheirBatnaEntity = new TheirBatna();
        this.addTheirBatnaEntity.theirBatnaId =0;
        this.addTheirBatnaEntity.theirBatanValue= "";
        this.addTheirBatnaEntity.projectRequirementId = this.projectRequirementId;
        this.isAdd = true;
    }

    // deleteTheirBatna(theirBatna: vTheirBatna, rowIndex: number){
    //     this.theirBatnasService.delete(this.projectRequirementId,theirBatna.theirBatnaId).subscribe(t => {
    //         this.theirBatnas.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }

    showTheirBatnaDeleteComponent(theirBatna: vTheirBatna, rowIndex: number): void 
    {
        this.dialog.confirmation([theirBatna.theirBatanValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.theirBatnasService.delete(this.projectRequirementId, theirBatna.theirBatnaId).subscribe(t => {
                    this.theirBatnas.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    onSearchChangeAddBatana(value, isFirstTime: boolean = false) {
        
        this.validMessageAddBatana = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeBatana(value, isFirstTime: boolean = false) {
        
        this.validMessageBatana = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

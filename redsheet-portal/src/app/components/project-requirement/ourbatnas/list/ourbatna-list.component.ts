import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { Ourbatna } from 'app/database-models';
import { OurbatnasService } from '../ourbatnas.service';
import { OurbatnaDomain } from '../domain/ourbatna.domain';
import { ApplicationConfiguration} from "@rx/core";
import { vOurbatna } from 'app/database-models/v-ourbatna';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-ourbatna-list',
    templateUrl: './ourbatna-list.component.html',
})
export class OurbatnaListComponent extends OurbatnaDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    ourbatnas: vOurbatna[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input()  projectRequirementId :number;
    @Input() isLocked:boolean;
    addOurbatnaEntity:vOurbatna;
    isAdd:boolean = false;
    editRowIndex: number;
    editOurbatna: vOurbatna;
    showSave: boolean = false;
    validMessageAddBatana: ValidMessage;
    validMessageBatana: ValidMessage;

    constructor(
        private ourbatnasService: OurbatnasService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast,
    ) { 
        super();
        this.editOurbatna = new vOurbatna();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.ourbatnasService.get(this.projectRequirementId).subscribe(ourbatnas => {
            this.validMessageAddBatana = new ValidMessage();
            this.onSearchChangeAddBatana('', true);
            this.validMessageBatana = new ValidMessage();

            this.ourbatnas = ourbatnas;
            this.showComponent = true;
        });
    }

    showEditRecord(ourbatna: vOurbatna, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editOurbatna = new vOurbatna(ourbatna);
        this.showSave = true;

        this.onSearchChangeBatana(ourbatna.ourbatnaValue, false);
    }
  

    updateOurbatna(ourbatna: Ourbatna): void {
        
        if(ourbatna.ourbatnaValue.length > 0)
        {
        if(ourbatna && ourbatna.ourbatnaValue && ourbatna.ourbatnaValue.length <=400){
            if(ourbatna.ourbatnaId!=0){
                
                    this.ourbatnasService.put(this.projectRequirementId, ourbatna).subscribe(t => {
                        this.ourbatnas[this.editRowIndex ].ourbatnaValue = ourbatna.ourbatnaValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.OurbatnaValue, {status: 'error'});
                    })
                 
                }
                else{
                this.ourbatnasService.post(this.projectRequirementId, ourbatna).subscribe(t => {
                    this.ourbatnas.push(this.addOurbatnaEntity);
                    this.ourbatnas[ this.ourbatnas.length-1].ourbatnaId = t.ourbatnaId;
                    this.isAdd = false;
                }, error => {
                    this.toast.show(error.OurbatnaValue, {status: 'error'});
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

    addOurbatna(rowIndex: number): void {
        
        this.addOurbatnaEntity = new Ourbatna();
        this.addOurbatnaEntity.ourbatnaId =0;
        this.addOurbatnaEntity.ourbatnaValue= "";
        this.addOurbatnaEntity.projectRequirementId = this.projectRequirementId;
        this.isAdd = true;
    }

    // deleteOurBatna(ourBatna: vOurbatna, rowIndex: number){
    //     this.ourbatnasService.delete(this.projectRequirementId,ourBatna.ourBatnaId).subscribe(t => {
    //         this.ourBatnas.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }
    showOurbatnaDeleteComponent(ourbatna: vOurbatna, rowIndex: number): void 
    {
        this.dialog.confirmation([ourbatna.ourbatnaValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.ourbatnasService.delete(this.projectRequirementId, ourbatna.ourbatnaId).subscribe(t => {
                    this.ourbatnas.splice(rowIndex, 1)
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
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}

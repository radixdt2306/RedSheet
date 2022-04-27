import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vNanoTheirBatna, NanoTheirBatna } from 'app/database-models';
import { NanoTheirBatnasService } from '../nano-their-batnas.service';
import { NanoTheirBatnaDomain } from '../domain/nano-their-batna.domain';
import { ApplicationConfiguration } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-nano-their-batna-list',
    templateUrl: './nano-their-batna-list.component.html',
})
export class NanoTheirBatnaListComponent extends NanoTheirBatnaDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoTheirBatnas: vNanoTheirBatna[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input()  projectModuleId :number;
    @Input() isLocked:boolean;
    addNanoTheirBatnaEntity:vNanoTheirBatna;
    isAdd:boolean = false;
    editRowIndex: number;
    editNanoTheirBatna: vNanoTheirBatna;
    showSave: boolean = false;
    validMessageAddBatana: ValidMessage;
    validMessageBatana: ValidMessage;
    
    constructor(
        private nanoTheirBatnasService: NanoTheirBatnasService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast,
    ) { 
        super();
        this.editNanoTheirBatna = new vNanoTheirBatna();
    }

    ngOnInit(): void {
        
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.nanoTheirBatnasService.get(this.projectModuleId).subscribe(nanoTheirBatnas => {
            this.validMessageAddBatana = new ValidMessage();
            this.onSearchChangeAddBatana('', true);
            this.validMessageBatana = new ValidMessage();

            this.nanoTheirBatnas = nanoTheirBatnas;
            this.showComponent = true;
        });
    }
  
    showEditRecord(NanoTheirBatna: vNanoTheirBatna, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editNanoTheirBatna = new vNanoTheirBatna(NanoTheirBatna);
        this.showSave = true;
        this.onSearchChangeBatana(NanoTheirBatna.nanoTheirBatnaValue, false);
    }
  

    updateNanoTheirBatna(nanoTheirBatna: NanoTheirBatna): void {
        if(nanoTheirBatna.nanoTheirBatnaValue.length > 0)
        {
        if(nanoTheirBatna && nanoTheirBatna.nanoTheirBatnaValue && nanoTheirBatna.nanoTheirBatnaValue.length <=400){
            if(nanoTheirBatna.nanoTheirBatnaId!=0){
                
                    this.nanoTheirBatnasService.put(this.projectModuleId, nanoTheirBatna).subscribe(t => {
                        this.nanoTheirBatnas[this.editRowIndex ].nanoTheirBatnaValue = nanoTheirBatna.nanoTheirBatnaValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.nanoTheirBatnaValue, {status: 'error'});
                    })
                 
                }
                else{
                this.nanoTheirBatnasService.post(this.projectModuleId, nanoTheirBatna).subscribe(t => {
                    this.nanoTheirBatnas.push(this.addNanoTheirBatnaEntity);
                    this.nanoTheirBatnas[ this.nanoTheirBatnas.length-1].nanoTheirBatnaId = t.nanoTheirBatnaId;
                    this.isAdd = false;
                }, error => {
                    this.toast.show(error.NanoTheirBatnaValue, {status: 'error'});
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




    addNanoTheirBatna(rowIndex: number): void {
        this.addNanoTheirBatnaEntity = new NanoTheirBatna();
        this.addNanoTheirBatnaEntity.nanoTheirBatnaId =0;
        this.addNanoTheirBatnaEntity.nanoTheirBatnaValue= "";
        this.addNanoTheirBatnaEntity.projectModuleId = this.projectModuleId;
        this.isAdd = true;
    }

 
    showNanoTheirBatnaDeleteComponent(nanoTheirBatna: vNanoTheirBatna, rowIndex: number): void 
    {
        this.dialog.confirmation([nanoTheirBatna.nanoTheirBatnaValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.nanoTheirBatnasService.delete(this.projectModuleId, nanoTheirBatna.nanoTheirBatnaId).subscribe(t => {
                    this.nanoTheirBatnas.splice(rowIndex, 1)
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

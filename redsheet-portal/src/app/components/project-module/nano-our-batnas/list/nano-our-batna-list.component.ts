import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick } from '@rx/view';

import { vNanoOurBatna, NanoOurBatna } from 'app/database-models';
import { NanoOurBatnasService } from '../nano-our-batnas.service';
import { NanoOurBatnaDomain } from '../domain/nano-our-batna.domain';
import { ApplicationConfiguration } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector: 'app-nano-our-batna-list',
    templateUrl: './nano-our-batna-list.component.html',
})
export class NanoOurBatnaListComponent extends NanoOurBatnaDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoOurBatnas: vNanoOurBatna[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectModuleId: number;
    @Input() isLocked: boolean;
    addNanoOurBatnaEntity: vNanoOurBatna;
    isAdd: boolean = false;
    editRowIndex: number;
    editNanoOurBatna: vNanoOurBatna;
    showSave: boolean = false;
    validMessageAddBatana: ValidMessage;
    validMessageBatana: ValidMessage;

    constructor(
        private nanoOurBatnasService: NanoOurBatnasService,
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast,
    ) {
        super();
        this.editNanoOurBatna = new vNanoOurBatna();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.nanoOurBatnasService.get(this.projectModuleId).subscribe(nanoOurBatnas => {
            this.validMessageAddBatana = new ValidMessage();
            this.onSearchChangeAddBatana('', true);
            this.validMessageBatana = new ValidMessage();

            this.nanoOurBatnas = nanoOurBatnas;
            this.showComponent = true;
        });
    }

    showEditRecord(NanoOurBatna: vNanoOurBatna, rowIndex: number) {

        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editNanoOurBatna = new vNanoOurBatna(NanoOurBatna);
        this.showSave = true;
        this.onSearchChangeBatana(NanoOurBatna.nanoOurBatnaValue, false);
    }


    updateNanoOurBatna(nanoOurBatna: NanoOurBatna): void {
        if (nanoOurBatna.nanoOurBatnaValue.length > 0) {
            if (nanoOurBatna && nanoOurBatna.nanoOurBatnaValue && nanoOurBatna.nanoOurBatnaValue.length <= 400) {
                if (nanoOurBatna.nanoOurBatnaId != 0) {

                    this.nanoOurBatnasService.put(this.projectModuleId, nanoOurBatna).subscribe(t => {
                        this.nanoOurBatnas[this.editRowIndex].nanoOurBatnaValue = nanoOurBatna.nanoOurBatnaValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                        this.toast.show(error.NanoOurBatnaValue, { status: 'error' });
                    })

                }
                else {
                    this.nanoOurBatnasService.post(this.projectModuleId, nanoOurBatna).subscribe(t => {
                        this.nanoOurBatnas.push(this.addNanoOurBatnaEntity);
                        this.nanoOurBatnas[this.nanoOurBatnas.length - 1].nanoOurBatnaId = t.nanoOurBatnaId;
                        this.isAdd = false;
                    }, error => {
                        this.toast.show(error.NanoOurBatnaValue, { status: 'error' });
                    })
                    this.editRowIndex = null;
                    this.showSave = true;
                }
            } else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 400)
                    this.toast.show(maxLength, { status: 'error' });
                }
            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }




    addNanoOurBatna(rowIndex: number): void {
        this.addNanoOurBatnaEntity = new NanoOurBatna();
        this.addNanoOurBatnaEntity.nanoOurBatnaId = 0;
        this.addNanoOurBatnaEntity.nanoOurBatnaValue = "";
        this.addNanoOurBatnaEntity.projectModuleId = this.projectModuleId;
        this.isAdd = true;
    }

    // deleteOurBatna(ourBatna: vOurbatna, rowIndex: number){
    //     this.ourbatnasService.delete(this.projectRequirementId,ourBatna.ourBatnaId).subscribe(t => {
    //         this.ourBatnas.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }
    showNanoOurBatnaDeleteComponent(nanoOurBatna: vNanoOurBatna, rowIndex: number): void {
        this.dialog.confirmation([nanoOurBatna.nanoOurBatnaValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.nanoOurBatnasService.delete(this.projectModuleId, nanoOurBatna.nanoOurBatnaId).subscribe(t => {
                    this.nanoOurBatnas.splice(rowIndex, 1)
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

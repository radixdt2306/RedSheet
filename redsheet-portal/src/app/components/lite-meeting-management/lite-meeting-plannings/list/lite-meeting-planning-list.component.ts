import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vLiteMeetingPlanning, LiteMeetingPlanning } from 'app/database-models';
import { LiteMeetingPlanningsService } from '../lite-meeting-plannings.service';
import { LiteMeetingPlanningDomain } from '../domain/lite-meeting-planning.domain';
import { ApplicationConfiguration } from '@rx/core';


@Component({
    selector:'app-lite-meeting-planning-list',
    templateUrl: './lite-meeting-planning-list.component.html',
})
export class LiteMeetingPlanningListComponent extends LiteMeetingPlanningDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteMeetingPlannings: vLiteMeetingPlanning[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
	@Input()  liteMeetingManagementId :number;
    @Input() isLocked:boolean;
    isAdd:boolean = false;
    editRowIndex: number;
    editLiteMeetingPlanning: vLiteMeetingPlanning;
    addLiteMeetingPlanningEntity:vLiteMeetingPlanning;
    showSave: boolean = false;
    constructor(
        private liteMeetingPlanningsService: LiteMeetingPlanningsService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast
    ) { 
        super();
        this.editLiteMeetingPlanning = new vLiteMeetingPlanning();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteMeetingPlanningsService.get(this.liteMeetingManagementId).subscribe(liteMeetingPlannings => {
            this.liteMeetingPlannings = liteMeetingPlannings;
            this.showComponent = true;
        });
    }
    showEditRecord(liteMeetingPlanning: vLiteMeetingPlanning, rowIndex: number) {
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editLiteMeetingPlanning = new vLiteMeetingPlanning(liteMeetingPlanning);
        this.showSave = true;
    }
  

    updateLiteMeetingPlanning(liteMeetingPlanning: LiteMeetingPlanning): void {
        if (liteMeetingPlanning.liteMeetingPlanningValue.length > 0) {
            if (liteMeetingPlanning && liteMeetingPlanning.liteMeetingPlanningValue && liteMeetingPlanning.liteMeetingPlanningValue.length <= 350) {
                if (liteMeetingPlanning.liteMeetingPlanningId != 0) {

                    this.liteMeetingPlanningsService.put(this.liteMeetingManagementId, liteMeetingPlanning).subscribe(t => {
                        this.liteMeetingPlannings[this.editRowIndex].liteMeetingPlanningValue = liteMeetingPlanning.liteMeetingPlanningValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                         this.toast.show(error.LiteMeetingPlanningValue, {status: 'error'});
                    })
                }
                else {
                    this.liteMeetingPlanningsService.post(this.liteMeetingManagementId, liteMeetingPlanning).subscribe(t => {
                        this.liteMeetingPlannings.push(this.addLiteMeetingPlanningEntity);
                        this.liteMeetingPlannings[this.liteMeetingPlannings.length - 1].liteMeetingPlanningId = t.liteMeetingPlanningId;
                        this.isAdd = false;
                    }, error => {
                        this.toast.show(error.LiteMeetingPlanningValue, { status: 'error' });
                    })
                    this.editRowIndex = null;
                    this.showSave = true;
                    // this.saveFlag = true;
                }
            } else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 350)
                    this.toast.show(maxLength, { status: 'error' });
                }

            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    addLiteMeetingPlanning(rowIndex: number): void {
            this.addLiteMeetingPlanningEntity = new LiteMeetingPlanning();
            this.addLiteMeetingPlanningEntity.liteMeetingPlanningId =0;
            this.addLiteMeetingPlanningEntity.liteMeetingPlanningValue= "";
            this.addLiteMeetingPlanningEntity.liteMeetingManagementId = this.liteMeetingManagementId;
            this.isAdd = true;
    }
  

    showLiteMeetingPlanningDeleteComponent(liteMeetingPlanning: vLiteMeetingPlanning, rowIndex: number): void 
    {
        this.dialog.confirmation([liteMeetingPlanning.liteMeetingPlanningValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.liteMeetingPlanningsService.delete(this.liteMeetingManagementId, liteMeetingPlanning.liteMeetingPlanningId).subscribe(t => {
                    this.liteMeetingPlannings.splice(rowIndex, 1)
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
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}

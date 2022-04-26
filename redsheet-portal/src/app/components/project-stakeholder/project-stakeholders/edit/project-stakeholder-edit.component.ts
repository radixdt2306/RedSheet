import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectStakeholder, vProjectStakeholder, vProjectStakeholderRecord, StakeholderCommunicationMode, } from 'app/database-models';

import { ProjectStakeholderLookups, } from 'app/lookups';
import { ProjectStakeholdersService } from '../project-stakeholders.service';
import { ProjectStakeholderDomain } from '../domain/project-stakeholder.domain';
import { ProjectStakeholderLookupGroup } from '../domain/project-stakeholder.models';
import { debounce } from 'rxjs/operator/debounce';
import { ValidMessage } from 'app/view-models/validation-message';



@Component({
    templateUrl: './project-stakeholder-edit.component.html',
    entryComponents: [RxMessageComponent]
})
export class ProjectStakeholderEditComponent extends ProjectStakeholderDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectStakeholderFormGroup: FormGroup;
    editSubscription: Subscription;
    projectStakeholderLookupGroup: ProjectStakeholderLookupGroup;
    actionRequired: string;
    @Input() projectStakeholderId: number;
    communicationModes: any = [];
    validMessageStakeholderName: ValidMessage;
    validMessageFrequancy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectStakeholdersService: ProjectStakeholdersService,
        private dialog: RxDialog,
        private popup: RxPopup,
    ) {
        super();
    }
    ngOnInit(): void {

        this.projectStakeholdersService.group([this.projectStakeholderId], [ProjectStakeholderLookups.communicationModes, ProjectStakeholderLookups.stakeholderTypes,]).then(
            (response: ProjectStakeholderLookupGroup) => {

                this.projectStakeholderLookupGroup = response;
                this.projectStakeholderLookupGroup.projectStakeholder = new ProjectStakeholder(this.projectStakeholderLookupGroup.vProjectStakeholderRecord[0]);
                var projectStakeholder = new ProjectStakeholder(response.vProjectStakeholderRecord);
                this.projectStakeholderFormGroup = this.validation.getFormGroup(projectStakeholder);
                var stakeHolderFormArray: any = this.projectStakeholderFormGroup.controls.stakeholderCommunicationModes;
                for (let i = 0; i < projectStakeholder.stakeholderCommunicationModes.length; i++) {
                    stakeHolderFormArray.controls[i].controls.stakeholderCommunicationModeId.setValue(0);
                    var stakeholder = projectStakeholder.stakeholderCommunicationModes[i];
                    var communicationMode: any = this.projectStakeholderLookupGroup.communicationModes.where(t => t.communicationModeId == stakeholder.communicationModeId)[0]
                    if (communicationMode) {
                        communicationMode.isActive = true;
                        communicationMode.removeIndex = i;
                    }
                }
                this.checkStakeholderType(this.projectStakeholderFormGroup.controls.stakeholderTypeId.value);
                this.validMessageStakeholderName = new ValidMessage();
                this.validMessageFrequancy = new ValidMessage();

                this.onSearchChangeStackholderName(this.projectStakeholderFormGroup.controls.stakeholderName.value, false);
                this.onSearchChangeFrequency(this.projectStakeholderFormGroup.controls.frequancy.value, false);

                this.showComponent = true;
            });
    }

    editProjectStakeholder(): void {
        this.editSubscription = this.projectStakeholdersService.put(this.projectStakeholderFormGroup.value).subscribe(t => {
            this.hideProjectStackHolderEditComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    editCommunicationMode(communicationMode: any,): void {
        const stakeholderCommunicationModes = <FormArray>this.projectStakeholderFormGroup.controls["stakeholderCommunicationModes"];
        var communicationData = this.projectStakeholderLookupGroup.communicationModes.find(a => a.communicationModeId == communicationMode.communicationModeId);
        var stakeholderCommunicationMode = new StakeholderCommunicationMode();
        stakeholderCommunicationMode.communicationModeId = communicationMode.communicationModeId;
        stakeholderCommunicationMode.projectStakeholderId = this.projectStakeholderId;
        if (!communicationMode.isActive) {
            if (communicationData) {
                stakeholderCommunicationMode['isActive'] = !communicationMode.isActive;
                communicationData['isActive'] = !communicationMode.isActive;
                stakeholderCommunicationMode['removeIndex'] = stakeholderCommunicationModes.length - 1;
                communicationData['removeIndex'] = stakeholderCommunicationModes.length - 1;
            }
            stakeholderCommunicationModes.push(this.validation.getFormGroup(stakeholderCommunicationMode));
        } else {
            if (communicationData) {
                stakeholderCommunicationMode['isActive'] = !communicationMode.isActive;
                communicationData['isActive'] = !communicationMode.isActive;
            }
            let removeIndex = 0;
            for (let formGroup of stakeholderCommunicationModes.controls) {
                if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                    break;
                } else
                    removeIndex++;
            }
            stakeholderCommunicationModes.removeAt(removeIndex)
        }


    }

    checkStakeholderType(stakeholderTypeId: number): void {
        this.actionRequired = this.projectStakeholderLookupGroup.stakeholderTypes.find(a => a.stakeholderTypeId == stakeholderTypeId).actionRequried;
        this.projectStakeholderFormGroup.controls.stakeholderTypeId.setValue(stakeholderTypeId);
    }
    hideProjectStackHolderEditComponent(): void {
        document.body.className = "";
        this.popup.hide(ProjectStakeholderEditComponent);
    }

    isDisabledUpdateButton() {
        let returnValue = 0;
        let stakeholderCommunicationModes = <FormArray>this.projectStakeholderFormGroup.controls["stakeholderCommunicationModes"];
        if (this.projectStakeholderFormGroup.controls.stakeholderTypeId.value != 0 && stakeholderCommunicationModes.controls.length > 0) {
            returnValue = 1;
        }
        return returnValue;
    }

    onSearchChangeStackholderName(value, isFirstTime: boolean = false) {
        
        this.validMessageStakeholderName = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangeFrequency(value, isFirstTime: boolean = false) {
        
        this.validMessageFrequancy = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectStakeholderFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}

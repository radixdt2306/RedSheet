import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectStakeholder, StakeholderCommunicationMode, CommunicationMode, } from 'app/database-models';

import { ProjectStakeholderLookups, } from 'app/lookups';
import { ProjectStakeholdersService } from '../project-stakeholders.service';
import { ProjectStakeholderDomain } from '../domain/project-stakeholder.domain';
import { ProjectStakeholderLookupGroup } from '../domain/project-stakeholder.models';
import { ValidationMessage } from 'app/const/validation-msg/custom-validation';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-stakeholder-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class ProjectStakeholderAddComponent extends ProjectStakeholderDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    projectStakeholderFormGroup: FormGroup;
    addSubscription: Subscription;
    projectStakeholderLookupGroup: ProjectStakeholderLookupGroup;
    projectStakeholderId: number = 0;
    actionRequired: string = ValidationMessage.selectOneOfTheOptionAbove;
    colorRed: boolean = true;
    validMessageStakeholderName: ValidMessage;
    validMessageFrequancy: ValidMessage;

    @Input() projectModuleId: number;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private projectStakeholdersService: ProjectStakeholdersService,
    ) {
        super();
    }

    ngOnInit(): void {

        this.projectStakeholdersService.lookup([ProjectStakeholderLookups.communicationModes, ProjectStakeholderLookups.stakeholderTypes,]).then(
            (response: ProjectStakeholderLookupGroup) => {

                this.projectStakeholderLookupGroup = response;
                this.projectStakeholderLookupGroup.projectStakeholder = new ProjectStakeholder(this.projectStakeholderLookupGroup.vProjectStakeholderRecord);
                this.projectStakeholderId = 0;
                if (this.projectStakeholderId == 0) {
                    var projectStakeholder = new ProjectStakeholder();
                    projectStakeholder.projectModuleId = this.projectModuleId;
                    projectStakeholder.frequancy = null;
                    projectStakeholder.projectStakeholderId = 0;
                    projectStakeholder.stakeholderName = null;
                    projectStakeholder.stakeholderTypeId = null;
                    projectStakeholder.stakeholderCommunicationModes = new Array<StakeholderCommunicationMode>();
                    this.projectStakeholderFormGroup = this.validation.getFormGroup(projectStakeholder);
                }
                else {
                    this.projectStakeholderFormGroup = this.validation.getFormGroup(this.projectStakeholderLookupGroup.projectStakeholder);
                }

                this.projectStakeholderFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
                this.validMessageStakeholderName = new ValidMessage();
                this.validMessageFrequancy = new ValidMessage();

                this.onSearchChangeStackholderName('', true);
                this.onSearchChangeFrequency('', true);
                this.showComponent = true;
            });
    }

    addProjectStakeholder(): void {
        
        if (this.projectStakeholderFormGroup.valid) {
            this.addSubscription = this.projectStakeholdersService.post(this.projectStakeholderFormGroup.value).subscribe(t => {
                this.HideProjectStackHolderAddComponent();
                this.router.navigate(["project-stakeholder", this.projectModuleId, "project-stakeholders"])
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
    }

    addCommunicationMode(communicationMode: any): void {

        var stakeholderCommunicationModes = <FormArray>this.projectStakeholderFormGroup.controls["stakeholderCommunicationModes"];
        var stakeholderCommunicationMode = new StakeholderCommunicationMode();
        stakeholderCommunicationMode.communicationModeId = communicationMode.communicationModeId;
        stakeholderCommunicationMode.projectStakeholderId = 0;
        if (!communicationMode.isActive) {
            stakeholderCommunicationModes.push(this.validation.getFormGroup(stakeholderCommunicationMode));
            communicationMode.removeIndex = stakeholderCommunicationModes.length - 1;
        } else {
            let removeIndex = 0;
            for (let formGroup of stakeholderCommunicationModes.controls) {
                if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                    break;
                } else
                    removeIndex++;
            }
            stakeholderCommunicationModes.removeAt(removeIndex)
        }
        communicationMode.isActive = !communicationMode.isActive;
        //console.log(this.projectStakeholderFormGroup);
        //console.log(this.projectStakeholderFormGroup.controls["stakeholderCommunicationModes"])
    }

    isDisabledSaveButton() {
        let returnValue = false;
        let stakeholderCommunicationModes = <FormArray>this.projectStakeholderFormGroup.controls["stakeholderCommunicationModes"];

        if (stakeholderCommunicationModes.controls.length > 0) {

            returnValue = true;
        }
        return returnValue;
    }

    HideProjectStackHolderAddComponent(): void {
        document.body.className = "";
        this.popup.hide(ProjectStakeholderAddComponent);
    }

    checkStakeholderType(stakeholderTypeId: number): void {
        this.actionRequired = this.projectStakeholderLookupGroup.stakeholderTypes.find(a => a.stakeholderTypeId == stakeholderTypeId).actionRequried;
        this.projectStakeholderFormGroup.controls.stakeholderTypeId.setValue(stakeholderTypeId);

        this.colorRed = false;
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
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}

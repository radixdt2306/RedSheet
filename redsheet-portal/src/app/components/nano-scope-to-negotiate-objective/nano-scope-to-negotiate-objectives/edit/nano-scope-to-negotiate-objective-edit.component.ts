import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, ValidationFailedComponent, DialogDataModel } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { NanoScopeToNegotiateObjective, vNanoScopeToNegotiateObjectiveRecord, NanoScopeToNegotiateCommunicationMode, } from 'app/database-models';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, BACKGOUND_CONST, NANO_SCOPETONEGOTIATEOBJECTIVE_CONST } from 'app/const';
import { NanoScopeToNegotiateObjectiveLookups, } from 'app/lookups';
import { NanoScopeToNegotiateObjectivesService } from '../nano-scope-to-negotiate-objectives.service';
import { NanoScopeToNegotiateObjectiveDomain } from '../domain/nano-scope-to-negotiate-objective.domain';
import { NanoScopeToNegotiateObjectiveLookupGroup } from '../domain/nano-scope-to-negotiate-objective.models';
import { NanoOurObjectiveListComponent } from 'app/components/nano-scope-to-negotiate-objective/nano-our-objectives/list/nano-our-objective-list.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './nano-scope-to-negotiate-objective-edit.component.html',
    entryComponents: [NanoOurObjectiveListComponent, ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})

export class NanoScopeToNegotiateObjectiveEditComponent extends NanoScopeToNegotiateObjectiveDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    nanoScopeToNegotiateObjectiveFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    nanoScopeToNegotiateObjectiveLookupGroup: NanoScopeToNegotiateObjectiveLookupGroup;;
    nanoScopeToNegotiateObjectiveId: number;
    projectModuleId: number;

    validMessageBuy: ValidMessage;
    validMessageFocus: ValidMessage;
    validMessageReason: ValidMessage;
    validMessageOpponentName: ValidMessage;
    validMessageKnowAboutThem: ValidMessage;

    constructor(
        private validation: RxValidation,
        private rxDialogue: RxDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private nanoScopeToNegotiateObjectivesService: NanoScopeToNegotiateObjectivesService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.nanoScopeToNegotiateObjectiveId = param['nanoScopeToNegotiateObjectiveId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.nanoScopeToNegotiateObjectivesService.group([this.nanoScopeToNegotiateObjectiveId], [NanoScopeToNegotiateObjectiveLookups.communicationModes, NanoScopeToNegotiateObjectiveLookups.valueObjectives, NanoScopeToNegotiateObjectiveLookups.nanoRelationshipRequires, NanoScopeToNegotiateObjectiveLookups.nanoScopeToNegotiates,]).then(
            (response: NanoScopeToNegotiateObjectiveLookupGroup) => {
                this.nanoScopeToNegotiateObjectiveLookupGroup = response;
                this.nanoScopeToNegotiateObjectiveLookupGroup.nanoScopeToNegotiateObjective = new NanoScopeToNegotiateObjective(this.nanoScopeToNegotiateObjectiveLookupGroup.vNanoScopeToNegotiateObjectiveRecord);
                if (this.nanoScopeToNegotiateObjectiveId == 0) {
                    var nanoScopeToNegotiateObjective = new NanoScopeToNegotiateObjective();
                    nanoScopeToNegotiateObjective.projectModuleId = this.projectModuleId;
                    nanoScopeToNegotiateObjective.nanoScopeToNegotiateObjectiveId = 0;
                    nanoScopeToNegotiateObjective.knowAboutThem = null;
                    nanoScopeToNegotiateObjective.opponentName = null;
                    nanoScopeToNegotiateObjective.reason = null;
                    nanoScopeToNegotiateObjective.focus = null;
                    nanoScopeToNegotiateObjective.buy = null;
                    nanoScopeToNegotiateObjective.date = null;
                    nanoScopeToNegotiateObjective.nanoRelationshipRequireId = -1;
                    nanoScopeToNegotiateObjective.valueObjectiveId = -1;
                    nanoScopeToNegotiateObjective.nanoScopeToNegotiateId = -1;
                    nanoScopeToNegotiateObjective.nanoScopeToNegotiateCommunicationModes = new Array<NanoScopeToNegotiateCommunicationMode>();
                    this.nanoScopeToNegotiateObjectiveFormGroup = this.validation.getFormGroup(nanoScopeToNegotiateObjective);
                }
                else {
                    this.nanoScopeToNegotiateObjectiveLookupGroup.nanoScopeToNegotiateObjective = new NanoScopeToNegotiateObjective(this.nanoScopeToNegotiateObjectiveLookupGroup.vNanoScopeToNegotiateObjectiveRecord[0]);
                    var nanoScopeToNegotiateObjective = new NanoScopeToNegotiateObjective(response.vNanoScopeToNegotiateObjectiveRecord);
                    this.nanoScopeToNegotiateObjectiveFormGroup = this.validation.getFormGroup(nanoScopeToNegotiateObjective);
                    var nanoScopeToNegotiateFormArray: any = this.nanoScopeToNegotiateObjectiveFormGroup.controls.nanoScopeToNegotiateCommunicationModes;
                    for (let i = 0; i < nanoScopeToNegotiateObjective.nanoScopeToNegotiateCommunicationModes.length; i++) {
                        nanoScopeToNegotiateFormArray.controls[i].controls.nanoScopeToNegotiateCommunicationModeId.setValue(0);
                        var nanoScopeToNegotiate = nanoScopeToNegotiateObjective.nanoScopeToNegotiateCommunicationModes[i];
                        var communicationMode: any = this.nanoScopeToNegotiateObjectiveLookupGroup.communicationModes.where(t => t.communicationModeId == nanoScopeToNegotiate.communicationModeId)[0]
                        if (communicationMode) {
                            communicationMode.isActive = true;
                            communicationMode.removeIndex = i;
                        }
                    }
                }
                this.nanoScopeToNegotiateObjectiveFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageBuy = new ValidMessage();
                this.validMessageFocus = new ValidMessage();
                this.validMessageReason = new ValidMessage();
                this.validMessageOpponentName = new ValidMessage();
                this.validMessageKnowAboutThem = new ValidMessage();

                if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.buy.value == null)
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.buy.setValue('');
                if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.focus.value == null)
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.focus.setValue('');
                if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.reason.value == null)
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.reason.setValue('');
                if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.opponentName.value == null)
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.opponentName.setValue('');
                if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.knowAboutThem.value == null)
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.knowAboutThem.setValue('');

                this.onSearchChangeBuy(this.nanoScopeToNegotiateObjectiveFormGroup.controls.buy.value,
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.buy.value == '' ? true : false);
                this.onSearchChangeFocus(this.nanoScopeToNegotiateObjectiveFormGroup.controls.focus.value,
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.focus.value == '' ? true : false);
                this.onSearchChangeReason(this.nanoScopeToNegotiateObjectiveFormGroup.controls.reason.value,
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.reason.value == '' ? true : false);
                this.onSearchChangeOpponentName(this.nanoScopeToNegotiateObjectiveFormGroup.controls.opponentName.value,
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.opponentName.value == '' ? true : false);
                this.onSearchChangeKnowAboutThem(this.nanoScopeToNegotiateObjectiveFormGroup.controls.knowAboutThem.value,
                    this.nanoScopeToNegotiateObjectiveFormGroup.controls.knowAboutThem.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    displayMessageBox(index): void {
        if (index == 0) {
            this.rxDialogue.alert('Don’t try to negotiate, we recommend you close the project.', ["title: Message"]);
        }
        if (index == 1) {
            this.rxDialogue.alert('Don’t try to negotiate, we recommend you close the project.', ["title: Message"]);
        }
        if (index == 2) {
            this.rxDialogue.alert('Try for some added value.', ["title: Message"]);
        }
        if (index == 3) {
            this.rxDialogue.alert('Please continue to plan your negotiation.', ["title: Message"]);
        }
    }

    addNanoScopeToNegotiateObjective(): void {
        this.addSubscription = this.nanoScopeToNegotiateObjectivesService.post(this.nanoScopeToNegotiateObjectiveFormGroup.value).subscribe(t => {
            // this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/nano-scope-to-negotiate-objective/${this.projectModuleId}/nano-scope-to-negotiate-objectives/${t.nanoScopeToNegotiateObjectiveId}`,filterText: BACKGOUND_CONST.value});
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/nano-scope-to-negotiate-objectives/${this.projectModuleId}/${t.nanoScopeToNegotiateObjectiveId}`, filterText: NANO_SCOPETONEGOTIATEOBJECTIVE_CONST.value });
            this.nanoScopeToNegotiateObjectiveFormGroup.controls.nanoScopeToNegotiateObjectiveId.setValue(t.nanoScopeToNegotiateObjectiveId);
            this.router.navigate(["nano-scope-to-negotiate-objectives", this.projectModuleId, t.nanoScopeToNegotiateObjectiveId])

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    editNanoScopeToNegotiateObjective(): void {
        let todayDate = new Date();
        let nanoScopeToNegotiateObjective: NanoScopeToNegotiateObjective = this.nanoScopeToNegotiateObjectiveFormGroup.value;
        if (nanoScopeToNegotiateObjective.date > todayDate) {
            if (this.nanoScopeToNegotiateObjectiveId == 0) {
                this.addNanoScopeToNegotiateObjective();
            }
            else {
                this.editSubscription = this.nanoScopeToNegotiateObjectivesService.put(this.nanoScopeToNegotiateObjectiveFormGroup.value).subscribe(t => {
                },
                    error => {
                        this.toast.show(error, { status: 'error' });
                    })
            }
        }
        else {
            this.toast.show("Date should be greater than today's date ", { status: "error" })
        }
    }

    nanoScopeToNegotiateCommunicationMode(communicationMode: any): void {
        if (this.nanoScopeToNegotiateObjectiveId == 0) {
            var nanoScopeToNegotiateCommunicationModes = <FormArray>this.nanoScopeToNegotiateObjectiveFormGroup.controls["nanoScopeToNegotiateCommunicationModes"];
            var nanoScopeToNegotiateCommunicationMode = new NanoScopeToNegotiateCommunicationMode();
            nanoScopeToNegotiateCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            nanoScopeToNegotiateCommunicationMode.nanoScopeToNegotiateObjectiveId = 0;
            if (!communicationMode.isActive) {
                nanoScopeToNegotiateCommunicationModes.push(this.validation.getFormGroup(nanoScopeToNegotiateCommunicationMode));
                communicationMode.removeIndex = nanoScopeToNegotiateCommunicationModes.length - 1;
            } else {
                let removeIndex = 0;
                for (let formGroup of nanoScopeToNegotiateCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                nanoScopeToNegotiateCommunicationModes.removeAt(removeIndex)
            }
            communicationMode.isActive = !communicationMode.isActive;
        }
        else {
            const nanoScopeToNegotiateCommunicationModes = <FormArray>this.nanoScopeToNegotiateObjectiveFormGroup.controls["nanoScopeToNegotiateCommunicationModes"];
            var communicationData = this.nanoScopeToNegotiateObjectiveLookupGroup.communicationModes.find(a => a.communicationModeId == communicationMode.communicationModeId);
            var nanoScopeToNegotiateCommunicationMode = new NanoScopeToNegotiateCommunicationMode();
            nanoScopeToNegotiateCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            nanoScopeToNegotiateCommunicationMode.nanoScopeToNegotiateObjectiveId = this.nanoScopeToNegotiateObjectiveId;
            if (!communicationMode.isActive) {
                if (communicationData) {
                    nanoScopeToNegotiateCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                    nanoScopeToNegotiateCommunicationMode['removeIndex'] = nanoScopeToNegotiateCommunicationModes.length - 1;
                    communicationData['removeIndex'] = nanoScopeToNegotiateCommunicationModes.length - 1;
                }
                nanoScopeToNegotiateCommunicationModes.push(this.validation.getFormGroup(nanoScopeToNegotiateCommunicationMode));
            } else {
                if (communicationData) {
                    nanoScopeToNegotiateCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                }
                let removeIndex = 0;
                for (let formGroup of nanoScopeToNegotiateCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                nanoScopeToNegotiateCommunicationModes.removeAt(removeIndex)
            }
        }
    }

    isDisabledSaveButton() {
        let returnValue = 0;
        if (this.nanoScopeToNegotiateObjectiveFormGroup.controls.nanoScopeToNegotiateId.value != null && this.nanoScopeToNegotiateObjectiveFormGroup.controls.valueObjectiveId.value != null && this.nanoScopeToNegotiateObjectiveFormGroup.controls.nanoRelationshipRequireId.value != null) {
            returnValue = 1;
        }
        return returnValue;
    }

    onSearchChangeBuy(value, isFirstTime: boolean = false) {
        
        this.validMessageBuy = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangeFocus(value, isFirstTime: boolean = false) {
        
        this.validMessageFocus = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeReason(value, isFirstTime: boolean = false) {
        
        this.validMessageReason = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeOpponentName(value, isFirstTime: boolean = false) {
        
        this.validMessageOpponentName = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangeKnowAboutThem(value, isFirstTime: boolean = false) {
        
        this.validMessageKnowAboutThem = ValidMessage.onSearchChangesCommon(value, 500, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nanoScopeToNegotiateObjectiveFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteProjectBackground, vLiteProjectBackgroundRecord, LiteBackgroundCommunicationMode, } from 'app/database-models';

import { LiteProjectBackgroundLookups, } from 'app/lookups';
import { LiteProjectBackgroundsService } from '../lite-project-backgrounds.service';
import { LiteProjectBackgroundDomain } from '../domain/lite-project-background.domain';
import { LiteProjectBackgroundLookupGroup } from '../domain/lite-project-background.models';

import { LiteTheirTeamMemberListComponent } from 'app/components/lite-project-background/lite-their-team-members/list/lite-their-team-member-list.component';
import { LiteOurTeamMemberListComponent } from 'app/components/lite-project-background/lite-our-team-members/list/lite-our-team-member-list.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { ApplicationBroadcaster } from '@rx/core';
import { SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, LITE_BACKGROUND_CONST } from 'app/const';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { LiteOurTeamMemberEditComponent } from 'app/components/lite-project-background/lite-our-team-members/edit/lite-our-team-member-edit.component';
import { LiteOurTeamMemberAddComponent } from 'app/components/lite-project-background/lite-our-team-members/add/lite-our-team-member-add.component';
import { LiteTheirTeamMemberAddComponent } from 'app/components/lite-project-background/lite-their-team-members/add/lite-their-team-member-add.component';
import { LiteTheirTeamMemberEditComponent } from 'app/components/lite-project-background/lite-their-team-members/edit/lite-their-team-member-edit.component';
import { LiteTargetListComponent } from 'app/components/lite-project-background/lite-targets/list/lite-target-list.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-project-background-edit.component.html',
    entryComponents: [LiteOurTeamMemberAddComponent, LiteOurTeamMemberEditComponent, LiteTheirTeamMemberAddComponent, LiteTheirTeamMemberEditComponent,
        LiteTheirTeamMemberListComponent, LiteOurTeamMemberListComponent, ProjectModuleEditComponent, ProjectModuleHelpDetailComponent, LiteTargetListComponent]
})

export class LiteProjectBackgroundEditComponent extends LiteProjectBackgroundDomain implements OnInit, OnDestroy {
    [x: string]: any;
    showComponent: boolean = false;
    isLocked: boolean = false;
    liteProjectBackgroundFormGroup: FormGroup;
    editSubscription: Subscription;
    liteProjectBackgroundLookupGroup: LiteProjectBackgroundLookupGroup;;
    liteProjectBackgroundId: number;
    projectModuleId: number;

    validMessageOpponentName: ValidMessage;
    validMessageFocus: ValidMessage;
    validMessageReason: ValidMessage;
    validMessageKnownIssues: ValidMessage;
    validMessageKnowAboutThem: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteProjectBackgroundsService: LiteProjectBackgroundsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.liteProjectBackgroundId = param['liteProjectBackgroundId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.liteProjectBackgroundsService.group([this.liteProjectBackgroundId], [LiteProjectBackgroundLookups.communicationModes, LiteProjectBackgroundLookups.valueObjectives, LiteProjectBackgroundLookups.liteRelationshipRequires]).then(
            (response: LiteProjectBackgroundLookupGroup) => {
                this.liteProjectBackgroundLookupGroup = response;
                this.liteProjectBackgroundLookupGroup.liteProjectBackground = new LiteProjectBackground(this.liteProjectBackgroundLookupGroup.vLiteProjectBackgroundRecord);
                if (this.liteProjectBackgroundId == 0) {
                    var liteProjectBackground = new LiteProjectBackground();
                    liteProjectBackground.projectModuleId = this.projectModuleId;
                    liteProjectBackground.opponentName = null;
                    liteProjectBackground.focus = null
                    liteProjectBackground.reason = null;
                    liteProjectBackground.dateOfNegotiation = null;
                    liteProjectBackground.knownIssues = null;
                    liteProjectBackground.knowAboutThem = null;
                    // liteProjectBackground.isRelationshipRequired = true;
                    liteProjectBackground.valueObjectiveId = -1;
                    liteProjectBackground.liteBackgroundCommunicationModes = new Array<LiteBackgroundCommunicationMode>();
                    this.liteProjectBackgroundFormGroup = this.validation.getFormGroup(liteProjectBackground);
                }
                else {
                    this.liteProjectBackgroundLookupGroup.liteProjectBackground = new LiteProjectBackground(this.liteProjectBackgroundLookupGroup.vLiteProjectBackgroundRecord[0])
                    var liteProjectBackground = new LiteProjectBackground(response.vLiteProjectBackgroundRecord);
                    this.liteProjectBackgroundFormGroup = this.validation.getFormGroup(liteProjectBackground);
                    var liteProjectBackgroundFormArray: any = this.liteProjectBackgroundFormGroup.controls.liteBackgroundCommunicationModes;
                    for (let i = 0; i < liteProjectBackground.liteBackgroundCommunicationModes.length; i++) {
                        liteProjectBackgroundFormArray.controls[i].controls.liteBackgroundCommunicationModeId.setValue(0);
                        var lightBackground = liteProjectBackground.liteBackgroundCommunicationModes[i];
                        var communicationMode: any = this.liteProjectBackgroundLookupGroup.communicationModes.where(t => t.communicationModeId == lightBackground.communicationModeId)[0]
                        if (communicationMode) {
                            communicationMode.isActive = true;
                            communicationMode.removeIndex = i;
                        }
                    }
                }
                this.liteProjectBackgroundFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageOpponentName = new ValidMessage();
                this.validMessageFocus = new ValidMessage();
                this.validMessageReason = new ValidMessage();
                this.validMessageKnownIssues = new ValidMessage();
                this.validMessageKnowAboutThem = new ValidMessage();

                if (this.liteProjectBackgroundFormGroup.controls.opponentName.value == null)
                    this.liteProjectBackgroundFormGroup.controls.opponentName.setValue('');
                if (this.liteProjectBackgroundFormGroup.controls.focus.value == null)
                    this.liteProjectBackgroundFormGroup.controls.focus.setValue('');
                if (this.liteProjectBackgroundFormGroup.controls.reason.value == null)
                    this.liteProjectBackgroundFormGroup.controls.reason.setValue('');
                if (this.liteProjectBackgroundFormGroup.controls.knownIssues.value == null)
                    this.liteProjectBackgroundFormGroup.controls.knownIssues.setValue('');
                if (this.liteProjectBackgroundFormGroup.controls.knowAboutThem.value == null)
                    this.liteProjectBackgroundFormGroup.controls.knowAboutThem.setValue('');

                this.onSearchChangeOpponentName(this.liteProjectBackgroundFormGroup.controls.opponentName.value,
                    this.liteProjectBackgroundFormGroup.controls.opponentName.value == '' ? true : false);
                this.onSearchChangeFocus(this.liteProjectBackgroundFormGroup.controls.focus.value,
                    this.liteProjectBackgroundFormGroup.controls.focus.value == '' ? true : false);
                this.onSearchChangeReason(this.liteProjectBackgroundFormGroup.controls.reason.value,
                    this.liteProjectBackgroundFormGroup.controls.reason.value == '' ? true : false);
                this.onSearchChangeKnownIssues(this.liteProjectBackgroundFormGroup.controls.knownIssues.value,
                    this.liteProjectBackgroundFormGroup.controls.knownIssues.value == '' ? true : false);
                this.onSearchChangeKnowAboutThem(this.liteProjectBackgroundFormGroup.controls.knowAboutThem.value,
                    this.liteProjectBackgroundFormGroup.controls.knowAboutThem.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editLiteProjectBackground(): void {
        let todayDate = new Date();
        let liteProjectBackground: LiteProjectBackground = this.liteProjectBackgroundFormGroup.value;
        if (liteProjectBackground.dateOfNegotiation > todayDate) {
            if (this.liteProjectBackgroundId == 0) {
                this.addLiteProjectBackground()
            }
            else {
                this.editSubscription = this.liteProjectBackgroundsService.put(this.liteProjectBackgroundFormGroup.value).subscribe(t => {
                },
                    error => {
                        this.toast.show(error, { status: 'error' })
                    })
            }
        }
        else {
            this.toast.show("Date should be greater than today's date ", { status: "error" })
        }
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    addLiteProjectBackground(): void {
        this.addSubscription = this.liteProjectBackgroundsService.post(this.liteProjectBackgroundFormGroup.value).subscribe(t => {
            this.router.navigate(["lite-project-backgrounds", this.projectModuleId, t.liteProjectBackgroundId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/lite-project-backgrounds/${this.projectModuleId}/${t.liteProjectBackgroundId}`, filterText: LITE_BACKGROUND_CONST.value });
            this.liteProjectBackgroundFormGroup.controls.liteProjectBackgroundId.setValue(t.liteProjectBackgroundId);
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideLiteProjectBackgroundEditComponent(): void {
        document.body.className = "";
        this.popup.hide(LiteProjectBackgroundEditComponent);
    }

    editCommunicationMode(communicationMode: any,): void {
        if (this.liteProjectBackgroundId == 0) {
            var liteBackgroundCommunicationModes = <FormArray>this.liteProjectBackgroundFormGroup.controls["liteBackgroundCommunicationModes"];
            var liteBackgroundCommunicationMode = new LiteBackgroundCommunicationMode();
            liteBackgroundCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            liteBackgroundCommunicationMode.liteProjectBackgroundId = 0;
            if (!communicationMode.isActive) {
                liteBackgroundCommunicationModes.push(this.validation.getFormGroup(liteBackgroundCommunicationMode));
                communicationMode.removeIndex = liteBackgroundCommunicationModes.length - 1;
            } else {
                let removeIndex = 0;
                for (let formGroup of liteBackgroundCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                liteBackgroundCommunicationModes.removeAt(removeIndex)
            }
            communicationMode.isActive = !communicationMode.isActive;
        }
        else {
            const liteBackgroundCommunicationModes = <FormArray>this.liteProjectBackgroundFormGroup.controls["liteBackgroundCommunicationModes"];
            var communicationData = this.liteProjectBackgroundLookupGroup.communicationModes.find(a => a.communicationModeId == communicationMode.communicationModeId);
            var liteBackgroundCommunicationMode = new LiteBackgroundCommunicationMode();
            liteBackgroundCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            liteBackgroundCommunicationMode.liteProjectBackgroundId = this.liteProjectBackgroundId;
            if (!communicationMode.isActive) {
                if (communicationData) {
                    liteBackgroundCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                    liteBackgroundCommunicationMode['removeIndex'] = liteBackgroundCommunicationModes.length - 1;
                    communicationData['removeIndex'] = liteBackgroundCommunicationModes.length - 1;
                }
                liteBackgroundCommunicationModes.push(this.validation.getFormGroup(liteBackgroundCommunicationMode));
            } else {
                if (communicationData) {
                    liteBackgroundCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                }
                let removeIndex = 0;
                for (let formGroup of liteBackgroundCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                liteBackgroundCommunicationModes.removeAt(removeIndex)
            }
        }
    }

    onSearchChangeOpponentName(value, isFirstTime: boolean = false) {
        
        this.validMessageOpponentName = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangeFocus(value, isFirstTime: boolean = false) {
        
        this.validMessageFocus = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeReason(value, isFirstTime: boolean = false) {
        
        this.validMessageReason = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeKnownIssues(value, isFirstTime: boolean = false) {
        
        this.validMessageKnownIssues = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeKnowAboutThem(value, isFirstTime: boolean = false) {
        
        this.validMessageKnowAboutThem = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteProjectBackgroundFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

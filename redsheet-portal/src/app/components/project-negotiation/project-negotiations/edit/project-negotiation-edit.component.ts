import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectNegotiation, vProjectNegotiationRecord, TheirTeamCommunicationMode, } from 'app/database-models';

import { ProjectStakeholderLookups, } from 'app/lookups';
import { ProjectNegotiationsService } from '../project-negotiations.service';
import { ProjectNegotiationDomain } from '../domain/project-negotiation.domain';
import { ProjectNegotiationLookupGroup } from '../domain/project-negotiation.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { TheirTeamMemberListComponent } from 'app/components/project-negotiation/their-team-members/list/their-team-member-list.component';
import { TargetListComponent } from 'app/components/project-negotiation/targets/list/target-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, THISNEGOTIAION_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-negotiation-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, TheirTeamMemberListComponent, TargetListComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectNegotiationEditComponent extends ProjectNegotiationDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectNegotiationFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    projectNegotiationLookupGroup: ProjectNegotiationLookupGroup;
    projectNegotiationId: number;
    projectModuleId: number;
    validMessageLocation: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectNegotiationsService: ProjectNegotiationsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {

        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectNegotiationId = param['projectNegotiationId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.projectNegotiationsService.group([this.projectNegotiationId], [ProjectStakeholderLookups.communicationModes,]).then(
            (response: ProjectNegotiationLookupGroup) => {

                this.projectNegotiationLookupGroup = response;
                this.projectNegotiationLookupGroup.projectNegotiation = new ProjectNegotiation(this.projectNegotiationLookupGroup.vProjectNegotiationRecord);
                if (this.projectNegotiationId == 0) {
                    var projectNegotiation = new ProjectNegotiation();
                    projectNegotiation.projectModuleId = this.projectModuleId;
                    projectNegotiation.projectNegotiationId = 0;
                    projectNegotiation.eventDate = null;
                    projectNegotiation.knowAboutThem = null;
                    projectNegotiation.knownIssues = null;
                    projectNegotiation.location = null;
                    projectNegotiation.theirTeamCommunicationModes = new Array<TheirTeamCommunicationMode>();
                    this.projectNegotiationFormGroup = this.validation.getFormGroup(projectNegotiation);
                }
                else {
                    this.projectNegotiationLookupGroup.projectNegotiation = new ProjectNegotiation(this.projectNegotiationLookupGroup.vProjectNegotiationRecord[0]);
                    var projectNegotiation = new ProjectNegotiation(response.vProjectNegotiationRecord);
                    this.projectNegotiationFormGroup = this.validation.getFormGroup(projectNegotiation);
                    var negotiationFormArray: any = this.projectNegotiationFormGroup.controls.theirTeamCommunicationModes;
                    for (let i = 0; i < projectNegotiation.theirTeamCommunicationModes.length; i++) {
                        negotiationFormArray.controls[i].controls.theirTeamCommunicationModeId.setValue(0);
                        var negotiation = projectNegotiation.theirTeamCommunicationModes[i];
                        var communicationMode: any = this.projectNegotiationLookupGroup.communicationModes.where(t => t.communicationModeId == negotiation.communicationModeId)[0]
                        if (communicationMode) {
                            communicationMode.isActive = true;
                            communicationMode.removeIndex = i;
                        }
                    }
                }
                this.projectNegotiationFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
                if (this.projectNegotiationFormGroup.controls.location.value == null)
                    this.projectNegotiationFormGroup.controls.location.setValue('');

                this.onSearchChangeLocation(this.projectNegotiationFormGroup.controls.location.value,
                    this.projectNegotiationFormGroup.controls.location.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    addProjectNegotiation(): void {
        this.addSubscription = this.projectNegotiationsService.post(this.projectNegotiationFormGroup.value).subscribe(t => {
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-negotiation/${this.projectModuleId}/project-negotiations/${t.projectNegotiationId}`, filterText: THISNEGOTIAION_CONST.value });
            this.projectNegotiationFormGroup.controls.projectNegotiationId.setValue(t.projectNegotiationId);
            this.router.navigate(["project-negotiation", this.projectModuleId, "project-negotiations", t.projectNegotiationId])

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    editProjectNegotiation(): void {
        let todayDate = new Date();
        let projectNegotiation: ProjectNegotiation = this.projectNegotiationFormGroup.value;
        if (projectNegotiation.eventDate > todayDate) {
            if (this.projectNegotiationId == 0) {
                this.addProjectNegotiation()
            }
            else {
                this.editSubscription = this.projectNegotiationsService.put(this.projectNegotiationFormGroup.value).subscribe(t => {

                },
                    error => {
                        this.toast.show(error, { status: 'error' })
                    })
            }
        }
        else {
            this.toast.show("Event Date should be greater than today's date ", { status: "error" })
        }
    }

    projectNegotiationCommunicationMode(communicationMode: any): void {
        if (this.projectNegotiationId == 0) {
            var theirTeamCommunicationModes = <FormArray>this.projectNegotiationFormGroup.controls["theirTeamCommunicationModes"];
            var theirTeamCommunicationMode = new TheirTeamCommunicationMode();
            theirTeamCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            theirTeamCommunicationMode.projectNegotiationId = 0;
            if (!communicationMode.isActive) {
                theirTeamCommunicationModes.push(this.validation.getFormGroup(theirTeamCommunicationMode));
                communicationMode.removeIndex = theirTeamCommunicationModes.length - 1;
            } else {
                let removeIndex = 0;
                for (let formGroup of theirTeamCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                theirTeamCommunicationModes.removeAt(removeIndex)
            }
            communicationMode.isActive = !communicationMode.isActive;
        }
        else {
            const theirTeamCommunicationModes = <FormArray>this.projectNegotiationFormGroup.controls["theirTeamCommunicationModes"];
            var communicationData = this.projectNegotiationLookupGroup.communicationModes.find(a => a.communicationModeId == communicationMode.communicationModeId);
            var theirTeamCommunicationMode = new TheirTeamCommunicationMode();
            theirTeamCommunicationMode.communicationModeId = communicationMode.communicationModeId;
            theirTeamCommunicationMode.projectNegotiationId = this.projectNegotiationId;
            if (!communicationMode.isActive) {
                if (communicationData) {
                    theirTeamCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                    theirTeamCommunicationMode['removeIndex'] = theirTeamCommunicationModes.length - 1;
                    communicationData['removeIndex'] = theirTeamCommunicationModes.length - 1;
                }
                theirTeamCommunicationModes.push(this.validation.getFormGroup(theirTeamCommunicationMode));
            } else {
                if (communicationData) {
                    theirTeamCommunicationMode['isActive'] = !communicationMode.isActive;
                    communicationData['isActive'] = !communicationMode.isActive;
                }
                let removeIndex = 0;
                for (let formGroup of theirTeamCommunicationModes.controls) {
                    if (formGroup.value.communicationModeId == communicationMode.communicationModeId) {
                        break;
                    } else
                        removeIndex++;
                }
                theirTeamCommunicationModes.removeAt(removeIndex)
            }
        }
    }

    onSearchChangeLocation(value, isFirstTime: boolean = false) {
        
        this.validMessageLocation = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectNegotiationFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

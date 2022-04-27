import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectPreparation, vProjectPreparationRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectPreparationsService } from '../project-preparations.service';
import { ProjectPreparationDomain } from '../domain/project-preparation.domain';
import { ProjectPreparationLookupGroup } from '../domain/project-preparation.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { EventPlanningActionListComponent } from 'app/components/project-preparation/event-planning-actions/list/event-planning-action-list.component';
import { CommunicationPlanListComponent } from 'app/components/project-preparation/communication-plans/list/communication-plan-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, PREPARATION_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { EventPlanningActionAddComponent } from 'app/components/project-preparation/event-planning-actions/add/event-planning-action-add.component';
import { EventPlanningActionEditComponent } from 'app/components/project-preparation/event-planning-actions/edit/event-planning-action-edit.component';
import { CommunicationPlanAddComponent } from 'app/components/project-preparation/communication-plans/add/communication-plan-add.component';
import { CommunicationPlanEditComponent } from 'app/components/project-preparation/communication-plans/edit/communication-plan-edit.component';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-preparation-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, EventPlanningActionListComponent, CommunicationPlanListComponent, EventPlanningActionAddComponent, EventPlanningActionEditComponent, CommunicationPlanAddComponent, CommunicationPlanEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectPreparationEditComponent extends ProjectPreparationDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectPreparationFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    projectPreparationLookupGroup: ProjectPreparationLookupGroup;;
    projectPreparationId: number;
    projectModuleId: number;
    validMessageElevatorSpeech: ValidMessage;
    validMessagePreConditioningMessage: ValidMessage;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectPreparationsService: ProjectPreparationsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectPreparationId = param['projectPreparationId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.projectPreparationsService.getBy([this.projectPreparationId]).subscribe(
            (response: ProjectPreparation) => {

                this.projectPreparationLookupGroup = new ProjectPreparationLookupGroup();
                this.projectPreparationLookupGroup.projectPreparation = new ProjectPreparation(response);
                if (this.projectPreparationId == 0) {
                    var projectPreparation = new ProjectPreparation();
                    projectPreparation.projectModuleId = this.projectModuleId;
                    projectPreparation.projectPreparationId = 0;
                    projectPreparation.elevatorSpeech = null;
                    projectPreparation.preConditioningMessage = null;
                    this.projectPreparationFormGroup = this.validation.getFormGroup(projectPreparation);
                }
                else {
                    this.projectPreparationFormGroup = this.validation.getFormGroup(this.projectPreparationLookupGroup.projectPreparation);
                }
                this.projectPreparationFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageElevatorSpeech = new ValidMessage();
                this.validMessagePreConditioningMessage = new ValidMessage();

                if (this.projectPreparationFormGroup.controls.elevatorSpeech.value == null)
                    this.projectPreparationFormGroup.controls.elevatorSpeech.setValue('');
                if (this.projectPreparationFormGroup.controls.preConditioningMessage.value == null)
                    this.projectPreparationFormGroup.controls.preConditioningMessage.setValue('');

                this.onSearchChangeElevatorSpeech(this.projectPreparationFormGroup.controls.elevatorSpeech.value,
                    this.projectPreparationFormGroup.controls.elevatorSpeech.value == '' ? true : false);
                this.onSearchChangePreConditioningMessage(this.projectPreparationFormGroup.controls.preConditioningMessage.value,
                    this.projectPreparationFormGroup.controls.preConditioningMessage.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    addProjectPreparation(): void {

        this.addSubscription = this.projectPreparationsService.post(this.projectPreparationFormGroup.value).subscribe(t => {

            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-preparation/${this.projectModuleId}/project-preparations/${t.projectPreparationId}`, filterText: PREPARATION_CONST.value });
            this.projectPreparationFormGroup.controls.projectPreparationId.setValue(t.projectPreparationId);
            this.router.navigate(["project-preparation", this.projectModuleId, "project-preparations", t.projectPreparationId])

        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    editProjectPreparation(): void {

        if (this.projectPreparationId == 0) {
            this.addProjectPreparation()
        } else {
            this.editSubscription = this.projectPreparationsService.put(this.projectPreparationFormGroup.value).subscribe(t => {

            },
                error => {
                    this.toast.show(error, { status: 'error' });
                })
        }
    }

    onSearchChangeElevatorSpeech(value, isFirstTime: boolean = false) {
        
        this.validMessageElevatorSpeech = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangePreConditioningMessage(value, isFirstTime: boolean = false) {
        
        this.validMessagePreConditioningMessage = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectPreparationFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
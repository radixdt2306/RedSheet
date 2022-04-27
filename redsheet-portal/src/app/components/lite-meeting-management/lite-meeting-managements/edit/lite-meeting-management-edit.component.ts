import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteMeetingManagement, vLiteMeetingManagementRecord, } from 'app/database-models';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, LITE_MEETINGMANAGEMENT_CONST } from 'app/const';
import { } from 'app/lookups';
import { LiteMeetingManagementsService } from '../lite-meeting-managements.service';
import { LiteMeetingManagementDomain } from '../domain/lite-meeting-management.domain';
import { LiteMeetingManagementLookupGroup } from '../domain/lite-meeting-management.models';

import { LiteMeetingPlanningListComponent } from 'app/components/lite-meeting-management/lite-meeting-plannings/list/lite-meeting-planning-list.component';
import { LiteMeetingManagementTimingListComponent } from 'app/components/lite-meeting-management/lite-meeting-management-timings/list/lite-meeting-management-timing-list.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { LiteEventPlanningActionListComponent } from 'app/components/lite-meeting-management/lite-event-planning-actions/list/lite-event-planning-action-list.component';
import { LiteEventPlanningActionAddComponent } from 'app/components/lite-meeting-management/lite-event-planning-actions/add/lite-event-planning-action-add.component';
import { LiteEventPlanningActionEditComponent } from 'app/components/lite-meeting-management/lite-event-planning-actions/edit/lite-event-planning-action-edit.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-meeting-management-edit.component.html',
    entryComponents: [LiteEventPlanningActionAddComponent, LiteEventPlanningActionEditComponent, LiteMeetingPlanningListComponent, LiteMeetingManagementTimingListComponent, ProjectModuleEditComponent, ProjectModuleHelpDetailComponent, LiteEventPlanningActionListComponent]
})

export class LiteMeetingManagementEditComponent extends LiteMeetingManagementDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    liteMeetingManagementFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    liteMeetingManagementLookupGroup: LiteMeetingManagementLookupGroup;;
    liteMeetingManagementId: number;
    projectModuleId: number;

    validMessagePreMeetingConditioning: ValidMessage
    validMessageOpeningStatement: ValidMessage;
    validMessageIntangiblePowerPlan: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteMeetingManagementsService: LiteMeetingManagementsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.liteMeetingManagementId = param['liteMeetingManagementId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.liteMeetingManagementsService.getBy([this.liteMeetingManagementId]).subscribe(
            (response: vLiteMeetingManagementRecord) => {
                this.liteMeetingManagementLookupGroup = new LiteMeetingManagementLookupGroup();
                this.liteMeetingManagementLookupGroup.liteMeetingManagement = new LiteMeetingManagement(response);
                this.liteMeetingManagementFormGroup = this.validation.getFormGroup(this.liteMeetingManagementLookupGroup.liteMeetingManagement);
                this.liteMeetingManagementFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageOpeningStatement = new ValidMessage();
                this.validMessageIntangiblePowerPlan = new ValidMessage();
                this.validMessagePreMeetingConditioning = new ValidMessage();

                if (this.liteMeetingManagementFormGroup.controls.preMeetingConditioning.value == null)
                    this.liteMeetingManagementFormGroup.controls.preMeetingConditioning.setValue('');
                if (this.liteMeetingManagementFormGroup.controls.openingStatement.value == null)
                    this.liteMeetingManagementFormGroup.controls.openingStatement.setValue('');
                if (this.liteMeetingManagementFormGroup.controls.intangiblePowerPlan.value == null)
                    this.liteMeetingManagementFormGroup.controls.intangiblePowerPlan.setValue('');

                this.onSearchChangePreMeetingConditioning('', true);
                this.onSearchChangeOpeningStatement('', true);
                this.onSearchChangeIntangiblePowerPlan('', true);

                this.showComponent = true;
            });

    }

    addLiteMeetingManagement(): void {
        this.addSubscription = this.liteMeetingManagementsService.post(this.liteMeetingManagementFormGroup.value).subscribe(t => {
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/lite-meeting-managements/${this.projectModuleId}/${t.liteMeetingManagementId}`, filterText: LITE_MEETINGMANAGEMENT_CONST.value });
            this.liteMeetingManagementFormGroup.controls.liteMeetingManagementId.setValue(t.liteMeetingManagementId);
            this.router.navigate(["lite-meeting-managements", this.projectModuleId, t.liteMeetingManagementId])

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }


    editLiteMeetingManagement(): void {
        if (this.liteMeetingManagementId == 0) {
            this.addLiteMeetingManagement();
        } else
            this.editSubscription = this.liteMeetingManagementsService.put(this.liteMeetingManagementFormGroup.value).subscribe(t => {

            },
                error => {
                    this.toast.show(error, { status: 'error' });
                })

    }

    contentDisable(res) {
        this.isLocked = res;
    }

    onSearchChangePreMeetingConditioning(value, isFirstTime: boolean = false) {
        
        this.validMessagePreMeetingConditioning = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeOpeningStatement(value, isFirstTime: boolean = false) {
        
        this.validMessageOpeningStatement = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeIntangiblePowerPlan(value, isFirstTime: boolean = false) {
        
        this.validMessageIntangiblePowerPlan = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteMeetingManagementFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

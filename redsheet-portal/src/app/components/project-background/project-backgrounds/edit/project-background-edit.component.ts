import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectBackground, } from 'app/database-models';

import { ProjectBackgroundLookups, } from 'app/lookups';
import { ProjectBackgroundsService } from '../project-backgrounds.service';
import { ProjectBackgroundDomain } from '../domain/project-background.domain';
import { ProjectBackgroundLookupGroup } from '../domain/project-background.models';

import { BackgroundEventListComponent } from 'app/components/project-background/background-events/list/background-event-list.component';
import { LongTermObjectiveListComponent } from 'app/components/project-background/long-term-objectives/list/long-term-objective-list.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, BACKGOUND_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-background-edit.component.html',
    entryComponents: [BackgroundEventListComponent, LongTermObjectiveListComponent, ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectBackgroundEditComponent extends ProjectBackgroundDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectBackgroundFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    projectBackgroundLookupGroup: ProjectBackgroundLookupGroup;
    projectBackgroundId: number;
    projectModuleId: number;
    validMessageOpponentName: ValidMessage;
    validMessageFocus: ValidMessage;
    validMessageReason: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectBackgroundsService: ProjectBackgroundsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectBackgroundId = param['projectBackgroundId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.projectBackgroundsService.group([this.projectBackgroundId], [ProjectBackgroundLookups.negotiationTypes,
        ProjectBackgroundLookups.valueObjectives, ProjectBackgroundLookups.relationshipRequires,]).then(
            (response: ProjectBackgroundLookupGroup) => {
                this.projectBackgroundLookupGroup = response;
                this.projectBackgroundLookupGroup.ProjectBackground = new ProjectBackground(this.projectBackgroundLookupGroup.ProjectBackground);
                this.projectBackgroundFormGroup = this.validation.getFormGroup(this.projectBackgroundLookupGroup.ProjectBackground);
                this.projectBackgroundFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageOpponentName = new ValidMessage();
                this.validMessageFocus = new ValidMessage();
                this.validMessageReason = new ValidMessage();

                if (this.projectBackgroundFormGroup.controls.opponentName.value == null)
                    this.projectBackgroundFormGroup.controls.opponentName.setValue('');
                if (this.projectBackgroundFormGroup.controls.focus.value == null)
                    this.projectBackgroundFormGroup.controls.focus.setValue('');
                if (this.projectBackgroundFormGroup.controls.reason.value == null)
                    this.projectBackgroundFormGroup.controls.reason.setValue('');

                this.onSearchChangeOpponentName(this.projectBackgroundFormGroup.controls.opponentName.value,
                    this.projectBackgroundFormGroup.controls.opponentName.value == '' ? true : false);
                this.onSearchChangeFocus(this.projectBackgroundFormGroup.controls.focus.value,
                    this.projectBackgroundFormGroup.controls.focus.value == '' ? true : false);
                this.onSearchChangeReason(this.projectBackgroundFormGroup.controls.reason.value,
                    this.projectBackgroundFormGroup.controls.reason.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    contentDisable(res) {
        debugger;
        this.isLocked = res;
    }

    addProjectBackground(): void {

        this.addSubscription = this.projectBackgroundsService.post(this.projectBackgroundFormGroup.value).subscribe(t => {
            //this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-background/${this.projectModuleId}/project-backgrounds/${t.projectBackgroundId}`,filterText:'project-backgrounds'});
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-background/${this.projectModuleId}/project-backgrounds/${t.projectBackgroundId}`, filterText: BACKGOUND_CONST.value });
            this.projectBackgroundFormGroup.controls.projectBackgroundId.setValue(t.projectBackgroundId);
            this.router.navigate(["project-background", this.projectModuleId, "project-backgrounds", t.projectBackgroundId])

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    editProjectBackground(): void {
        if (this.projectBackgroundId == 0) {
            this.addProjectBackground()
        } else
            this.editSubscription = this.projectBackgroundsService.put(this.projectBackgroundFormGroup.value).subscribe(t => {

            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
    }

    isDisabledSaveButton() {

        let returnValue = 0;
        if (this.projectBackgroundFormGroup.controls.negotiationTypeId.value != null && this.projectBackgroundFormGroup.controls.valueObjectiveId.value != null) {
            returnValue = 1;
        }
        return returnValue;
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

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectBackgroundFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}

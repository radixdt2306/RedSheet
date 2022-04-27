import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectEventTimeline, vProjectEventTimelineRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectEventTimelinesService } from '../project-event-timelines.service';
import { ProjectEventTimelineDomain } from '../domain/project-event-timeline.domain';
import { ProjectEventTimelineLookupGroup } from '../domain/project-event-timeline.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { ArrivalAndOpeningTacticListComponent } from 'app/components/project-event-timeline/arrival-and-opening-tactics/list/arrival-and-opening-tactic-list.component';
import { EventAgendaTimingListComponent } from 'app/components/project-event-timeline/event-agenda-timings/list/event-agenda-timing-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, EVENTTIMELINE_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-event-timeline-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, ArrivalAndOpeningTacticListComponent, EventAgendaTimingListComponent, ProjectModuleHelpDetailComponent,]
})

export class ProjectEventTimelineEditComponent extends ProjectEventTimelineDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectEventTimelineFormGroup: FormGroup;
    editSubscription: Subscription;
    projectEventTimelineLookupGroup: ProjectEventTimelineLookupGroup;
    projectEventTimelineId: number;
    addSubscription: Subscription;
    projectModuleId: number;

    validMessageRoomLayout: ValidMessage;
    validMessageOpeningStatement: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectEventTimelinesService: ProjectEventTimelinesService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {

            this.projectEventTimelineId = param['projectEventTimelineId']
            this.projectModuleId = param['projectModuleId']
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        })
    }

    ngOnInit(): void {
        this.projectEventTimelinesService.getBy([this.projectEventTimelineId]).subscribe(
            (response: vProjectEventTimelineRecord) => {

                this.projectEventTimelineLookupGroup = new ProjectEventTimelineLookupGroup();
                this.projectEventTimelineLookupGroup.projectEventTimeline = new ProjectEventTimeline(response);
                this.projectEventTimelineLookupGroup.projectEventTimeline.projectModuleId = this.projectModuleId;
                this.projectEventTimelineFormGroup = this.validation.getFormGroup(this.projectEventTimelineLookupGroup.projectEventTimeline);
                this.validMessageRoomLayout = new ValidMessage();
                this.validMessageOpeningStatement = new ValidMessage();

                if (this.projectEventTimelineFormGroup.controls.roomLayout.value == null)
                    this.projectEventTimelineFormGroup.controls.roomLayout.setValue('');
                if (this.projectEventTimelineFormGroup.controls.openingStatement.value == null)
                    this.projectEventTimelineFormGroup.controls.openingStatement.setValue('');

                this.onSearchChangeRoomLayout(this.projectEventTimelineFormGroup.controls.roomLayout.value,
                    this.projectEventTimelineFormGroup.controls.roomLayout.value == '' ? true : false);
                this.onSearchChangeOpeningStatement(this.projectEventTimelineFormGroup.controls.openingStatement.value,
                    this.projectEventTimelineFormGroup.controls.openingStatement.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    addProjectEventTimeline(): void {
        if (this.projectEventTimelineFormGroup.controls.startTime.value > this.projectEventTimelineFormGroup.controls.endTime.value) {
            this.toast.show("End Time should be greater than Start Time", { status: 'error' });
        }
        else if (this.projectEventTimelineFormGroup.controls.startTime.value == this.projectEventTimelineFormGroup.controls.endTime.value) {
            this.toast.show("Start Time and End Time can't same", { status: 'error' });
        }
        else {
            this.addSubscription = this.projectEventTimelinesService.post(this.projectEventTimelineFormGroup.value).subscribe(t => {

                this.router.navigate(["project-event-timelines", this.projectModuleId, t.projectEventTimelineId])
                this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-event-timelines/${this.projectModuleId}/${t.projectEventTimelineId}`, filterText: EVENTTIMELINE_CONST.value });
                this.projectEventTimelineFormGroup.controls.projectEventTimelineId.setValue(t.projectEventTimelineId);

            },
                error => {
                    this.toast.show("Please enter valid time.", { status: 'error' })
                })
        }
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    editProjectEventTimeline(): void {
        if (this.projectEventTimelineId == 0) {
            this.addProjectEventTimeline()
        }
        else {
            if (this.projectEventTimelineFormGroup.controls.startTime.value > this.projectEventTimelineFormGroup.controls.endTime.value) {
                this.toast.show("End Time should be greater than Start Time", { status: 'error' });
            }
            else if (this.projectEventTimelineFormGroup.controls.startTime.value == this.projectEventTimelineFormGroup.controls.endTime.value) {
                this.toast.show("Start Time and End Time can't same", { status: 'error' });
            }
            else {
                this.editSubscription = this.projectEventTimelinesService.put(this.projectEventTimelineFormGroup.value).subscribe(t => {
                },
                    error => {
                        // this.toast.show(error.validationMessage,{status: 'error'})
                        this.toast.show("Please enter valid time.", { status: 'error' })
                    })
            }
        }
    }

    onSearchChangeRoomLayout(value, isFirstTime: boolean = false) {
        
        this.validMessageRoomLayout = ValidMessage.onSearchChangesCommon(value, 350, isFirstTime);
    }

    onSearchChangeOpeningStatement(value, isFirstTime: boolean = false) {
        
        this.validMessageOpeningStatement = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectEventTimelineFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}

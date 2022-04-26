import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectImplementationPlan, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectImplementationPlansService } from '../project-implementation-plans.service';
import { ProjectImplementationPlanDomain } from '../domain/project-implementation-plan.domain';
import { ProjectImplementationPlanLookupGroup } from '../domain/project-implementation-plan.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-implementation-plan-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class ProjectImplementationPlanAddComponent extends ProjectImplementationPlanDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    projectImplementationPlanFormGroup: FormGroup;
    addSubscription: Subscription;
    projectImplementationPlanLookupGroup: ProjectImplementationPlanLookupGroup;;
    @Input() projectModuleId: number;

    validMessageName: ValidMessage;
    validMessageActivity: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private projectImplementationPlansService: ProjectImplementationPlansService,
        private popup: RxPopup,
    ) {
        super();
    }

    ngOnInit(): void {
        this.projectImplementationPlanLookupGroup = new ProjectImplementationPlanLookupGroup();
        this.projectImplementationPlanLookupGroup.projectImplementationPlan = new ProjectImplementationPlan();
        this.projectImplementationPlanFormGroup = this.validation.getFormGroup(this.projectImplementationPlanLookupGroup.projectImplementationPlan);
        this.projectImplementationPlanFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
        this.projectImplementationPlanFormGroup.controls.isEvent.setValue(true);

        this.validMessageName = new ValidMessage();
        this.validMessageActivity = new ValidMessage();

        this.onSearchChangeName('', true);
        this.onSearchChangeActivity('', true);

        this.showComponent = true;
    }

    addProjectImplementationPlan(): void {
        let startDate = this.projectImplementationPlanFormGroup.controls.startDate.value;
        let startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
        let startDay = ("0" + startDate.getDate()).slice(-2);
        let finalStartDate = [startDate.getFullYear(), startMonth, startDay].join("-");

        let endDate = this.projectImplementationPlanFormGroup.controls.endDate.value;
        if (endDate) {
            let endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
            let endDay = ("0" + endDate.getDate()).slice(-2);
            var finalEndDate = [endDate.getFullYear(), endMonth, endDay].join("-");
        }

        if (this.projectImplementationPlanFormGroup.controls.isEvent.value == true && !finalEndDate) {
            this.toast.show("Enter End Date", { status: 'error' });
        }
        else if (this.projectImplementationPlanFormGroup.controls.isEvent.value == true && finalStartDate == finalEndDate) {
            this.toast.show("Start Date and End Date can't same", { status: 'error' });
        }
        else if (this.projectImplementationPlanFormGroup.controls.isEvent.value == true && finalStartDate > finalEndDate) {
            this.toast.show("End Date should be greater than Start Date", { status: 'error' });
        }
        else {
            let todayDate = new Date();
            let projectProjectImplementationPlan: ProjectImplementationPlan = this.projectImplementationPlanFormGroup.value;
            if ((projectProjectImplementationPlan.isEvent && projectProjectImplementationPlan.startDate >= todayDate && projectProjectImplementationPlan.endDate >= projectProjectImplementationPlan.startDate) || (!projectProjectImplementationPlan.isEvent && projectProjectImplementationPlan.startDate > todayDate)) {
                if (!projectProjectImplementationPlan.isEvent) {
                    projectProjectImplementationPlan.endDate = null;
                }
                this.addSubscription = this.projectImplementationPlansService.post(this.projectModuleId, this.projectImplementationPlanFormGroup.value).subscribe(t => {
                    this.hideProjectImplementationPlanAddComponent();
                },
                    error => {
                        this.toast.show(error, { status: 'error' })
                    })
            }

            else {
                this.toast.show("Start Date/End Date should be greater than today's date ", { status: "error" })
            }
        }
    }

    hideProjectImplementationPlanAddComponent(): void {
        document.body.className = "";
        this.popup.hide(ProjectImplementationPlanAddComponent);
    }

    onSearchChangeName(value, isFirstTime: boolean = false) {
        
        this.validMessageName = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeActivity(value, isFirstTime: boolean = false) {
        
        this.validMessageActivity = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectImplementationPlanFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
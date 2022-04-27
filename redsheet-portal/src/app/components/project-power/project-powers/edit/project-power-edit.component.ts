import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectPower, vProjectPowerRecord, PowerTypeDetail, PowerType, } from 'app/database-models';

import { ProjectPowerLookups, } from 'app/lookups';
import { ProjectPowersService } from '../project-powers.service';
import { ProjectPowerDomain } from '../domain/project-power.domain';
import { ProjectPowerLookupGroup } from '../domain/project-power.models';
import { POWER_PROJECTIONS } from 'app/database-collections';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { PowerTypeDetailListComponent } from 'app/components/project-power/power-type-details/list/power-type-detail-list.component';
import { KnowledgeGatheringPlanListComponent } from 'app/components/project-power/knowledge-gathering-plans/list/knowledge-gathering-plan-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, POWER_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { FormArray } from '@angular/forms/src/model';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-power-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, PowerTypeDetailListComponent, KnowledgeGatheringPlanListComponent, ProjectModuleHelpDetailComponent]
})
export class ProjectPowerEditComponent extends ProjectPowerDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectPowerFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    projectPowerLookupGroup: ProjectPowerLookupGroup;;
    projectPowerId: number;
    projectModuleId: number;
    isActive: boolean = false;
    reportPersonList = new Array();
    placeholderPowerType: any[] = [];
    validMessageRationale: ValidMessage[] = [];
    private power_projections: any;

    validMessagePowerDetail: ValidMessage;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectPowersService: ProjectPowersService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectPowerId = param['projectPowerId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });

    }

    ngOnInit(): void {
        this.power_projections = POWER_PROJECTIONS;
        this.projectPowersService.group([this.projectPowerId], [ProjectPowerLookups.powerTypes]).then(
            (response: ProjectPowerLookupGroup) => {
                this.projectPowerLookupGroup = response;
                this.projectPowerLookupGroup.projectPower = new ProjectPower(this.projectPowerLookupGroup.vProjectPowerRecord);

                if (this.projectPowerId == 0) {
                    var projectPower = new ProjectPower();
                    projectPower.projectModuleId = this.projectModuleId;
                    projectPower.powerDetail = "";
                    projectPower.powerTypeDetails = new Array<PowerTypeDetail>();

                    this.projectPowerLookupGroup.powerTypes.forEach(powerType => {
                        var powerTypeDetail = new PowerTypeDetail();
                        powerTypeDetail.actualId = -1;
                        powerTypeDetail.projectedId = -1;
                        powerTypeDetail.isOurKnowledge = false;
                        powerTypeDetail.isTheirKnowledge = false;
                        powerTypeDetail.rationale = null;
                        powerTypeDetail.powerTypeId = powerType.powerTypeId;
                        powerTypeDetail.projectPowerId = 0;
                        projectPower.powerTypeDetails.push(powerTypeDetail);
                    });

                    this.placeholderPowerType[0] = "Degree of importance. Reliance upon you or the other party and the impact of failing to reach a favourable outcome. Speed and ease with which an alternative could be secured.";
                    this.placeholderPowerType[1] = "Strength of position in the market place. Changes in market dynamics and availability of alternatives.";
                    this.placeholderPowerType[2] = "Longevity of relationship, extent and influence of relationships and business arrangements between the two parties, degree of stakeholder support across the wider business.";
                    this.placeholderPowerType[3] = "Time available before a deal needs to be concluded.";
                    this.placeholderPowerType[4] = "Potential for one party to benefit and support the other’s future plans.";

                    this.projectPowerFormGroup = this.validation.getFormGroup(projectPower);
                }
                else {
                    this.projectPowerFormGroup = this.validation.getFormGroup(this.projectPowerLookupGroup.projectPower);
                }

                this.validMessagePowerDetail = new ValidMessage();

                if (this.projectPowerFormGroup.controls.powerDetail.value == null)
                    this.projectPowerFormGroup.controls.powerDetail.setValue('');

                this.onSearchChangePowerDetail(this.projectPowerFormGroup.controls.powerDetail.value,
                    this.projectPowerFormGroup.controls.powerDetail.value == '' ? true : false);
                let index = 0;
                this.projectPowerLookupGroup.powerTypes.forEach(powerType => {
                    let valAvailable = false;
                    this.validMessageRationale.push(new ValidMessage());
                    if(this.projectPowerLookupGroup && this.projectPowerLookupGroup.projectPower && this.projectPowerLookupGroup.projectPower.powerTypeDetails)
                    this.projectPowerLookupGroup.projectPower.powerTypeDetails.forEach(pd => {
                        if (pd.powerTypeId == powerType.powerTypeId) {
                            valAvailable = true;
                            this.onSearchChangeRationale(pd.rationale, index, false);
                        }
                    })
                    if (!valAvailable) {
                        this.onSearchChangeRationale('', index, true);
                    }
                    valAvailable = false;
                    index++;
                })

                this.showComponent = true;
            });
    }

    addProjectPower(): void {
        this.projectPowerFormGroup.controls.projectPowerId.setValue(this.projectPowerId);
        this.addSubscription = this.projectPowersService.post(this.projectPowerFormGroup.value).subscribe(t => {
            this.projectPowerFormGroup.controls.projectPowerId.setValue(t.projectPowerId);
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-power/${this.projectModuleId}/project-powers/${t.projectPowerId}`, filterText: POWER_CONST.value });
            this.router.navigate(["project-power", this.projectModuleId, "project-powers", t.projectPowerId])
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    editProjectPower(): void {
        if (this.projectPowerId == 0) {
            this.addProjectPower()
        }
        else {
            this.editSubscription = this.projectPowersService.put(this.projectPowerFormGroup.value).subscribe(t => {
               // console.log(this.projectPowerFormGroup);
            },
                error => {
                    this.toast.show(error, { status: 'error' });
                })
        }
    }

    placeholderChange(powerTypeNum): void {
        this.placeholderPowerType[0] = "Degree of importance. Reliance upon you or the other party and the impact of failing to reach a favourable outcome. Speed and ease with which an alternative could be secured.";
        this.placeholderPowerType[1] = "Strength of position in the market place. Changes in market dynamics and availability of alternatives.";
        this.placeholderPowerType[2] = "Longevity of relationship, extent and influence of relationships and business arrangements between the two parties, degree of stakeholder support across the wider business.";
        this.placeholderPowerType[3] = "Time available before a deal needs to be concluded.";
        this.placeholderPowerType[4] = "Potential for one party to benefit and support the other’s future plans.";
    }

    checkValidation(): boolean {
        var isValid: boolean = true;
        var powerTypeDetail = (<FormArray>(this.projectPowerFormGroup.controls['powerTypeDetails'])).controls;
        for (let i = 0; i < powerTypeDetail.length; i++) {
            var powerTypeDetailControl = <FormArray>(powerTypeDetail[i]);
            if (powerTypeDetailControl.controls["rationale"].value.trim() == '' || powerTypeDetailControl.controls["rationale"].value.length > 500) {
                isValid = false;
            }
        }
        return isValid;
    }

    checkReqValidation(num:number): boolean {
        var isValid: boolean = false;
        var powerTypeDetail = (<FormArray>(this.projectPowerFormGroup.controls['powerTypeDetails'])).controls;
        
        var powerTypeDetailControl = <FormArray>(powerTypeDetail[num]);
        if ((powerTypeDetailControl.controls["rationale"].value == undefined || powerTypeDetailControl.controls["rationale"].value == null || (powerTypeDetailControl.controls["rationale"].value && powerTypeDetailControl.controls["rationale"].value.trim()) == '') && (powerTypeDetailControl.controls["rationale"].dirty || powerTypeDetailControl.controls["rationale"].touched)) {                
            isValid = true;
        }
    
        return isValid;
    }

    onSearchChangePowerDetail(value, isFirstTime: boolean = false) {
        this.validMessagePowerDetail = ValidMessage.onSearchChangesCommon(value, 500, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectPowerFormGroup.dirty;
    }

    onSearchChangeRationale(value, rowIndex, isFirstTime: boolean = false) {
        
        this.validMessageRationale[rowIndex] = ValidMessage.onSearchChangesCommon(value, 500, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}

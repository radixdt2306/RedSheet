import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectRequirement, vOurRequirementDetail, ProjectZoma, vTheirRequirementDetail, TheirRequirementDetail, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectRequirementsService } from '../project-requirements.service';
import { ProjectRequirementDomain } from '../domain/project-requirement.domain';
import { ProjectRequirementLookupGroup, ProjectRequirementModel } from '../domain/project-requirement.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { OurRequirementDetailListComponent } from 'app/components/project-requirement/our-requirement-details/list/our-requirement-detail-list.component';
import { OurbatnaListComponent } from 'app/components/project-requirement/ourbatnas/list/ourbatna-list.component';
import { TheirRequirementDetailListComponent } from 'app/components/project-requirement/their-requirement-details/list/their-requirement-detail-list.component';
import { TheirRequirementDetailAddComponent } from 'app/components/project-requirement/their-requirement-details/add/their-requirement-detail-add.component';
import { TheirRequirementDetailEditComponent } from 'app/components/project-requirement/their-requirement-details/edit/their-requirement-detail-edit.component';
import { TheirBatnaListComponent } from 'app/components/project-requirement/their-batnas/list/their-batna-list.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, NEGOTIABLES_CONST, THEIRNEGOTIABLES_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { REQUIREMENT_CATEGORIES } from 'app/database-collections';
import { OurRequirementDetailsService } from 'app/components/project-requirement/our-requirement-details/our-requirement-details.service';
import { TheirRequirementDetailsService } from 'app/components/project-requirement/their-requirement-details/their-requirement-details.service';
import { ProjectZomasService } from 'app/components/project-module/project-zomas/project-zomas.service';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { fail } from 'assert';
import { forEach } from '@angular/router/src/utils/collection';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-requirement-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, OurRequirementDetailListComponent, OurbatnaListComponent, TheirBatnaListComponent, TheirRequirementDetailAddComponent, TheirRequirementDetailEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectRequirementEditComponent extends ProjectRequirementDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectRequirementFormGroup: FormGroup;
    editSubscription: Subscription;
    projectRequirementLookupGroup: ProjectRequirementLookupGroup;
    projectRequirementId: number;
    projectModuleId: number;
    requirementCategoryId: number;
    //private requirement_categories:any;
    ourCatId: number;
    theirCatId: number;
    projectRequirements: Array<ProjectRequirementModel>;
    ourRequirementId: number;
    deleteSubscription: Subscription;
    ourRequirementDataCount: number;
    currentIndex: number;

    previousPosition: boolean = false;
    nextPosition: boolean = false;
    countTheirPostition: number = 0;
    validMessageOurStrategy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectRequirementsService: ProjectRequirementsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster,
        private ourRequirementDetailsService: OurRequirementDetailsService,
        private theirRequirementDetailsService: TheirRequirementDetailsService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private projectZomasService: ProjectZomasService
    ) {
        super();
        this.popup.setComponent(componentFactoryResolver);
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectRequirementId = param['projectRequirementId'];
            this.projectModuleId = param['projectModuleId'];
            this.requirementCategoryId = param['requirementCategoryId'];
            this.ourRequirementId = param['ourRequirementId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.ourCatId = REQUIREMENT_CATEGORIES[0].requirementCategoryId;
        this.theirCatId = REQUIREMENT_CATEGORIES[1].requirementCategoryId;
        this.currentIndex = -1;
        if (this.requirementCategoryId == this.ourCatId) {
            this.projectRequirementsService.getBy([this.projectRequirementId]).subscribe(
                (response: ProjectRequirement) => {
                    //this.requirement_categories = REQUIREMENT_CATEGORIES;
                    this.projectRequirementLookupGroup = new ProjectRequirementLookupGroup();
                    this.projectRequirementLookupGroup.projectRequirement = new ProjectRequirement(response[0]);
                    this.projectRequirementFormGroup = this.validation.getFormGroup(this.projectRequirementLookupGroup.projectRequirement);
                    this.projectRequirementFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
                    this.projectRequirementFormGroup.controls.projectRequirementId.setValue(this.projectRequirementId);
                    this.projectRequirementFormGroup.controls.requirementCategoryId.setValue(this.requirementCategoryId);

                    this.validMessageOurStrategy = new ValidMessage();

                    if (this.projectRequirementFormGroup.controls.ourStrategy.value == null)
                        this.projectRequirementFormGroup.controls.ourStrategy.setValue('');

                    this.onSearchChangeOurStrategy(this.projectRequirementFormGroup.controls.ourStrategy.value,
                        this.projectRequirementFormGroup.controls.ourStrategy.value == '' ? true : false);
                    this.showComponent = true;
                });
        } else {
            this.projectZomasService.get(this.projectModuleId).subscribe(projectZomas => {
                this.ourRequirementDetailsService.get(this.ourRequirementId).subscribe((ourRequirementDetails: vOurRequirementDetail[]) => {

                    this.theirRequirementDetailsService.get(this.projectRequirementId).subscribe(theirRequirements => {
                        var count = 0;
                        this.countTheirPostition = theirRequirements.length;
                        this.projectRequirements = new Array<ProjectRequirementModel>();
                        ourRequirementDetails.forEach(ourRequirement => {
                            let projectZoma: ProjectZoma = <ProjectZoma>projectZomas.where(t => t.ourRequirementDetailId == ourRequirement.ourRequirementDetailId).firstOrDefault();
                            if (projectZoma) {

                                var theirRequirement = <vTheirRequirementDetail>theirRequirements.firstOrDefault(t => t.theirRequirementDetailId == projectZoma.theirRequirementDetailId);
                                if (theirRequirement) {

                                    this.projectRequirements.push(new ProjectRequirementModel(projectZoma.projectZomaId, true, ourRequirement, theirRequirement))
                                }
                            } else {
                                if (theirRequirements.length > count) {
                                    this.projectRequirements.push(new ProjectRequirementModel(0, false, ourRequirement, theirRequirements[count]))
                                } else {
                                    this.projectRequirements.push(new ProjectRequirementModel(0, false, ourRequirement))
                                }
                            }
                            count++;
                        })
                        if (theirRequirements.length > count) {
                            for (var i = count; i < theirRequirements.length; i++) {
                                this.projectRequirements.push(new ProjectRequirementModel(0, false, null, theirRequirements[i]));
                            }
                        }
                    })
                })
                this.showComponent = true;
            })
        }
    }

    requirementDataloaded(count: number) {
        this.ourRequirementDataCount = count;
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    isZomaUpdate(projectRequirement, ourRequirementDetailId, theirRequirementDetailId): void {
        projectRequirement.isZoma = !projectRequirement.isZoma;
        var projectZoma = new ProjectZoma();
        projectZoma.projectModuleId = this.projectModuleId;
        projectZoma.ourRequirementDetailId = ourRequirementDetailId;
        projectZoma.theirRequirementDetailId = theirRequirementDetailId;
        if (projectRequirement.isZoma) {
            this.projectZomasService.post(this.projectModuleId, projectZoma).subscribe(t => {
                projectRequirement.projectZomaId = t.projectZomaId;
                this.currentIndex = this.projectRequirements.length + 1;
                this.previousPosition = false;
                this.nextPosition = false;
                this.currentIndex = -1;
            },
                error => {
                    this.toast.show(error.validationMessage, { status: 'error' });
                });
        }
        else {
            this.projectZomasService.delete(this.projectModuleId, projectRequirement.projectZomaId).subscribe(t => {
                //this.currentIndex = this.projectRequirements.length + 1;
                this.projectRequirements[this.currentIndex].isZoma = false;
                this.previousPosition = false;
                this.nextPosition = false;
                this.currentIndex = -1;

            },
                error => {
                    this.toast.show(error.validationMessage, { status: 'error' });
                });

        }
    }

    sortUp() {
        for (var index = 1; index < this.projectRequirements.length; index++) {
            if (this.currentIndex - index >= 0) {
                var topObject = this.projectRequirements[this.currentIndex - index];
                for (var col in this.projectRequirements[this.currentIndex])
                    var currentObject = this.projectRequirements[this.currentIndex];
                if (currentObject && topObject) {
                    var topTheirObject = this.getObject(topObject.theirRequirementDetail);
                    var currentTheirObject = this.getObject(currentObject.theirRequirementDetail);
                    if (!topObject.isZoma) {

                        var theirRequirement = new TheirRequirementDetail();
                        theirRequirement.theirRequirementDetailId = currentObject.theirRequirementDetail.theirRequirementDetailId;
                        theirRequirement.ldo = currentObject.theirRequirementDetail.ldo;
                        theirRequirement.mdo = currentObject.theirRequirementDetail.mdo;
                        theirRequirement.projectRequirementId = currentObject.theirRequirementDetail.projectRequirementId;
                        theirRequirement.previousTheirRequirementDetailSortOrder = currentObject.theirRequirementDetail.sortOrder;
                        theirRequirement.sortOrder = topObject.theirRequirementDetail.sortOrder;
                        theirRequirement.requirement = currentObject.theirRequirementDetail.requirement;
                        theirRequirement.previousTheirRequirementId = topTheirObject.theirRequirementDetailId;

                        topObject.theirRequirementDetail = currentTheirObject;
                        currentObject.theirRequirementDetail = topTheirObject;
                        this.currentIndex = this.currentIndex - index;
                        this.editSubscription = this.theirRequirementDetailsService.put(this.projectRequirementId, theirRequirement).subscribe(t => {
                            var topObjectOrder = currentObject.theirRequirementDetail.sortOrder;
                            var curremtObjectOrder = topObject.theirRequirementDetail.sortOrder;
                            topObject.theirRequirementDetail.sortOrder = topObjectOrder;
                            currentObject.theirRequirementDetail.sortOrder = curremtObjectOrder;

                        },
                            error => {
                            })
                        break;
                    }
                }
            }
        }
        this.currentIndex = -1;
    }

    sortDown() {
        for (var index = 1; index < this.projectRequirements.length; index++) {
            if (this.currentIndex + index >= 0) {
                var nextObject = this.projectRequirements[this.currentIndex + index];
                for (var col in this.projectRequirements[this.currentIndex])
                    var currentObject = this.projectRequirements[this.currentIndex];
                if (currentObject && nextObject) {
                    var nextTheirObject = this.getObject(nextObject.theirRequirementDetail);
                    var currentTheirObject = this.getObject(currentObject.theirRequirementDetail);
                    if (!nextObject.isZoma) {
                        var theirRequirement = new TheirRequirementDetail();
                        theirRequirement.theirRequirementDetailId = currentObject.theirRequirementDetail.theirRequirementDetailId;
                        theirRequirement.ldo = currentObject.theirRequirementDetail.ldo;
                        theirRequirement.mdo = currentObject.theirRequirementDetail.mdo;
                        theirRequirement.projectRequirementId = currentObject.theirRequirementDetail.projectRequirementId;
                        theirRequirement.previousTheirRequirementDetailSortOrder = currentObject.theirRequirementDetail.sortOrder;
                        theirRequirement.sortOrder = nextObject.theirRequirementDetail.sortOrder;
                        theirRequirement.requirement = currentObject.theirRequirementDetail.requirement;
                        theirRequirement.previousTheirRequirementId = nextObject.theirRequirementDetail.theirRequirementDetailId;

                        nextObject.theirRequirementDetail = currentTheirObject;
                        currentObject.theirRequirementDetail = nextTheirObject;
                        this.currentIndex = this.currentIndex + index;
                        //eventAgendatiming.previousEventAgendaTimingRowIndex = this.previousEventAgendaTiming.rowIndex;
                        this.editSubscription = this.theirRequirementDetailsService.put(this.projectRequirementId, theirRequirement).subscribe(t => {
                            var nextObjectOrder = currentObject.theirRequirementDetail.sortOrder;
                            var curremtObjectOrder = nextObject.theirRequirementDetail.sortOrder;
                            nextObject.theirRequirementDetail.sortOrder = nextObjectOrder;
                            currentObject.theirRequirementDetail.sortOrder = curremtObjectOrder;

                        },
                            error => {
                            })
                        break;
                    }
                }
            }
        }
        this.currentIndex = -1;

    }

    getObject(object: any): any {
        var jObject = {};
        for (var col in object) {
            jObject[col] = object[col];
        }
        return jObject;
    }

    showTheirRequirementDetailAddComponent(vTheirRequirementDetail: vTheirRequirementDetail): void {
        document.body.className = "modal-open";
        this.popup.show(TheirRequirementDetailAddComponent, { projectModuleId: this.projectModuleId, projectRequirementId: this.projectRequirementId, theirRequirementDetailId: 0, requirementCategoryId: this.theirCatId, ourRequirementId: this.ourRequirementId }).then(t => this.ngOnInit());
    }

    showTheirRequirementDetailEditComponent(vTheirRequirementDetail: vTheirRequirementDetail): void {
        document.body.className = "modal-open";
        this.popup.show(TheirRequirementDetailEditComponent, { projectModuleId: this.projectModuleId, projectRequirementId: this.projectRequirementId, theirRequirementDetailId: vTheirRequirementDetail.theirRequirementDetailId, requirementCategoryId: this.theirCatId, ourRequirementId: this.ourRequirementId }).then(t => this.ngOnInit());
    }

    showTheirRequirementDetailDeleteComponent(vTheirRequirementDetail: vTheirRequirementDetail, rowIndex: number): void {
        var nextElemtnt = this.projectRequirements[rowIndex + 1];
        if (nextElemtnt) {
            if (nextElemtnt.isZoma) {
                this.dialog.alert("To delete this negotiable, first remove the ZOMA tick(s) for the next paired negotiables. Reapply the ticks afterwards", []);
            }
            else {
                this.allowedDelete(vTheirRequirementDetail);
            }
        }
        else {
            this.allowedDelete(vTheirRequirementDetail);
        }
    }

    allowedDelete(vTheirRequirementDetail) {
        this.dialog.confirmation([vTheirRequirementDetail.requirement], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.theirRequirementDetailsService.delete(this.projectRequirementId, vTheirRequirementDetail.theirRequirementDetailId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    editProjectRequirement(): void {
        this.projectRequirementFormGroup.controls.projectRequirementId.setValue(this.projectRequirementId);
        this.editSubscription = this.projectRequirementsService.put(this.projectRequirementFormGroup.value).subscribe(t => {
            this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements", this.requirementCategoryId, t.projectRequirementId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-requirement/${this.projectModuleId}/project-requirements/${this.requirementCategoryId}/${t.projectRequirementId}`, dependantValue: `${t.projectRequirementId}`, filterText: NEGOTIABLES_CONST.value });
            //this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-requirement/${this.projectModuleId}/project-requirements/${t.projectRequirementId}/${this.theirCatId}/0`,filterText:THEIRNEGOTIABLES_CONST.value});
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkValidation(): boolean {
        if (this.projectRequirementId == 0) {
            return true;
        }
        else if ((this.projectRequirementFormGroup.controls.ourStrategy.value == null || this.projectRequirementFormGroup.controls.ourStrategy.value == "")) {
            return true;
        }
        else if (this.projectRequirementFormGroup.controls.ourStrategy.value.length > 500) {
            return true;
        }
        else if (this.ourRequirementDataCount == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    selectNegotiables(rowIndex, isZoma): void {

        var j: number = rowIndex;
        for (j = rowIndex; j >= 0; j--) {
            if (j != rowIndex) {
                if (!this.projectRequirements[j].isZoma) {
                    this.previousPosition = true;
                    break;
                }
                else
                    this.previousPosition = false;
            }
            else {
                this.previousPosition = false;
            }
        }
        var i: number = rowIndex;
        for (i = rowIndex; i <= this.countTheirPostition - 1; i++) {
            if (i != rowIndex) {
                if (!this.projectRequirements[i].isZoma) {
                    this.nextPosition = true;
                    break;
                }
                else
                    this.nextPosition = false;
            }
            else
                this.nextPosition = false;
        }

        if (!isZoma) {
            this.currentIndex = rowIndex;
        }
    }

    onSearchChangeOurStrategy(value, isFirstTime: boolean = false) {
        
        this.validMessageOurStrategy = ValidMessage.onSearchChangesCommon(value, 500, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectRequirementFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}

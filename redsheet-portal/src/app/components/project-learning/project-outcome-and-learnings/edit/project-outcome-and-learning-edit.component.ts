import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectOutcomeAndLearning, vProjectOutcomeAndLearning, vProjectOutcomeAndLearningRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectOutcomeAndLearningsService } from '../project-outcome-and-learnings.service';
import { ProjectOutcomeAndLearningDomain } from '../domain/project-outcome-and-learning.domain';
import { ProjectOutcomeAndLearningLookupGroup } from '../domain/project-outcome-and-learning.models';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED } from 'app/const';
import { ApplicationBroadcaster, ApplicationConfiguration } from '@rx/core';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { OUTCOME_AND_LEARNING_CATEGORIES } from 'app/database-collections';
import { Response } from '@angular/http/src/static_response';
import { ProjectOutcomeAndLearningEditModule } from 'app/components/project-learning/project-outcome-and-learnings/edit/project-outcome-and-learning-edit.module';
import { debuglog } from 'util';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-outcome-and-learning-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectOutcomeAndLearningEditComponent extends ProjectOutcomeAndLearningDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectOutcomeAndLearningFormGroup: FormGroup;
    addSubscription: Subscription;
    editSubscription: Subscription;
    deleteSubscription: Subscription;
    projectOutcomeAndLearningLookupGroup: ProjectOutcomeAndLearningLookupGroup;;
    projectOutcomeAndLearningId: number;
    projectModuleId: number;
    private outcome_and_learning_categories: any;
    learning_categories: Object[];
    isAdd: boolean = false;
    placeholderType: any[] = [];
    editRowIndex: number;
    showSave: boolean = false;
    addProjectOutcomeAndLearningEntity: vProjectOutcomeAndLearning;
    projectOutcomeAndLearningPlan: vProjectOutcomeAndLearning[];
    validMessage_OLC: ValidMessage[] = [];
    validMessageAdd_OLC: ValidMessage[] = [];

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectOutcomeAndLearningsService: ProjectOutcomeAndLearningsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectOutcomeAndLearningId = param['projectOutcomeAndLearningId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        
        this.learning_categories = [
            {
                "outcomeAndLearningCategoryId": 78,
                "outcomeAndLearningCategoryName": "What went well ?"
            },
            {
                "outcomeAndLearningCategoryId": 79,
                "outcomeAndLearningCategoryName": "Even more effective if"
            },
            {
                "outcomeAndLearningCategoryId": 80,
                "outcomeAndLearningCategoryName": "What did we achieve ?"
            },
            {
                "outcomeAndLearningCategoryId": 81,
                "outcomeAndLearningCategoryName": "Key Learnings"
            },
        ];
        this.projectOutcomeAndLearningsService.getBy([this.projectModuleId]).subscribe(
            (response: any) => {

                this.outcome_and_learning_categories = this.learning_categories;
                this.projectOutcomeAndLearningPlan = response;
                this.placeholderType[0] = "List 4/5 things that went well";
                this.placeholderType[1] = "Make a list of things you would do to improve future outcomes";
                this.placeholderType[2] = "What was the end result and wins";
                this.placeholderType[3] = "What would you do next time";
                this.showComponent = true;
                this.isAdd = false;
                let index = 0;

                this.projectOutcomeAndLearningPlan.forEach(element => {
                    
                    this.validMessage_OLC.push(new ValidMessage());
                    this.onSearchChange_OLC(element.projectOutcomeAndLearningValue, index, false)
                    index++;
                });

            });
    }

    contentDisable(res) {
        this.isLocked = res;
    }
    addOutcomeAndLearningPlan(outcomeAndLearningCategoryId: any): void {

        this.addProjectOutcomeAndLearningEntity = new ProjectOutcomeAndLearning();
        this.addProjectOutcomeAndLearningEntity.outcomeAndLearningCategoryId = outcomeAndLearningCategoryId;
        this.addProjectOutcomeAndLearningEntity.projectModuleId = this.projectModuleId;
        this.addProjectOutcomeAndLearningEntity.projectOutcomeAndLearningId = 0;
        this.addProjectOutcomeAndLearningEntity.projectOutcomeAndLearningValue = "";
        this.isAdd = true;
        this.editRowIndex = null;
        this.showSave = false;

        let index = this.outcome_and_learning_categories.findIndex(p=>p.outcomeAndLearningCategoryId == outcomeAndLearningCategoryId);
        this.validMessageAdd_OLC.push(new ValidMessage());
        this.onSearchChangeAdd_OLC('', index, true)
    }
    addProjectOutcomeAndLearningPlan(projectOutcomeAndLearning: ProjectOutcomeAndLearning): void {
        if (projectOutcomeAndLearning.projectOutcomeAndLearningValue.length > 0) {

            if (projectOutcomeAndLearning && projectOutcomeAndLearning.projectOutcomeAndLearningValue && projectOutcomeAndLearning.projectOutcomeAndLearningValue.length <= 400) {
                this.addSubscription = this.projectOutcomeAndLearningsService.post(projectOutcomeAndLearning).subscribe(t => {
                    let recentProjectOutcomeAndLearningPlan = new ProjectOutcomeAndLearning();
                    recentProjectOutcomeAndLearningPlan.projectOutcomeAndLearningId = t.projectOutcomeAndLearningId;
                    recentProjectOutcomeAndLearningPlan.projectModuleId = this.projectModuleId;
                    recentProjectOutcomeAndLearningPlan.outcomeAndLearningCategoryId = this.addProjectOutcomeAndLearningEntity.outcomeAndLearningCategoryId;
                    recentProjectOutcomeAndLearningPlan.projectOutcomeAndLearningValue = this.addProjectOutcomeAndLearningEntity.projectOutcomeAndLearningValue;
                    this.addProjectOutcomeAndLearningEntity = recentProjectOutcomeAndLearningPlan;
                    this.projectOutcomeAndLearningPlan.push(this.addProjectOutcomeAndLearningEntity);
                    this.isAdd = false;
                    this.editRowIndex = null;
                    this.showSave = true;
                },
                    error => {
                        this.toast.show(error.ProjectOutcomeAndLearningValue, { status: 'error' });
                    })
            }
            else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 400)
                    this.toast.show(maxLength, { status: 'error' });
                }
            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    showEditRecord(outcomeAndLearningPlan: ProjectOutcomeAndLearning, rowIndex: number) {

        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.addProjectOutcomeAndLearningEntity = new ProjectOutcomeAndLearning(outcomeAndLearningPlan);
        this.showSave = true;
        this.placeholderType[outcomeAndLearningPlan.outcomeAndLearningCategoryId] = "List 4/5 things that went well";
        this.placeholderType[outcomeAndLearningPlan.outcomeAndLearningCategoryId] = "Make a list of things you would do to improve future outcomes";
        this.placeholderType[outcomeAndLearningPlan.outcomeAndLearningCategoryId] = "What was the end result and wins";
        this.placeholderType[outcomeAndLearningPlan.outcomeAndLearningCategoryId] = "What would you do next time";
    }


    editProjectOutcomeAndLearning(projectOutcomeAndLearning: ProjectOutcomeAndLearning): void {

        if (projectOutcomeAndLearning.projectOutcomeAndLearningValue.length > 0) {
            if (projectOutcomeAndLearning && projectOutcomeAndLearning.projectOutcomeAndLearningValue && projectOutcomeAndLearning.projectOutcomeAndLearningValue.length <= 400) {
                this.editSubscription = this.projectOutcomeAndLearningsService.put(projectOutcomeAndLearning).subscribe(t => {
                    this.projectOutcomeAndLearningPlan[this.editRowIndex].projectOutcomeAndLearningValue = projectOutcomeAndLearning.projectOutcomeAndLearningValue;
                    this.editRowIndex = null;
                    this.showSave = false;
                },
                    error => {
                        this.toast.show(error.ProjectOutcomeAndLearningValue, { status: 'error' });
                    })
            }
            else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 400)
                    this.toast.show(maxLength, { status: 'error' });
                }
            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    deleteProjectOutcomeAndLearningPlan(vProjectOutcomeAndLearning: vProjectOutcomeAndLearning, rowIndex: number): void {
        this.dialog.confirmation([vProjectOutcomeAndLearning.projectOutcomeAndLearningValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.deleteSubscription = this.projectOutcomeAndLearningsService.delete(vProjectOutcomeAndLearning.projectOutcomeAndLearningId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.projectOutcomeAndLearningPlan.splice(rowIndex, 1);
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
            else
                this.isAdd = false;
        });
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectOutcomeAndLearningFormGroup.dirty;
    }

    onSearchChange_OLC(value, index, isFirstTime: boolean = false) {
        
        this.validMessage_OLC[index] = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeAdd_OLC(value, index, isFirstTime: boolean = false) {
        
        this.validMessageAdd_OLC[index] = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}

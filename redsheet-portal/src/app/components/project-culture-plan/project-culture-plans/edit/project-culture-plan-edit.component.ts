import { Component, OnInit, OnDestroy , Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick,RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  ProjectCulturePlan, vProjectCulturePlanRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectCulturePlansService } from '../project-culture-plans.service';
import { ProjectCulturePlanDomain } from '../domain/project-culture-plan.domain';
import { ProjectCulturePlanLookupGroup } from '../domain/project-culture-plan.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED } from 'app/const';
import { ApplicationBroadcaster, ApplicationConfiguration } from '@rx/core';
import { CULTURE_PLAN_CATEGORIES } from 'app/database-collections';
import { CulturePlanCategoryEnum } from 'app/enums';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { fail } from 'assert';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-culture-plan-edit.component.html',
    entryComponents : [ ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectCulturePlanEditComponent extends ProjectCulturePlanDomain implements OnInit, OnDestroy {
    showComponent:boolean = false;
    isLocked: boolean = false;
    projectCulturePlanFormGroup: FormGroup;
    addSubscription: Subscription;
    deleteSubscription:Subscription;
    culturePlans: vProjectCulturePlanRecord[];
    projectCulturePlanLookupGroup: ProjectCulturePlanLookupGroup;
    projectCulturePlanId: number;
    projectModuleId: number;
    private culture_plan_categories:any = [];
    plan_categories:Object[];
    isAdd:boolean = false;
    addProjectCulturePlanEntity:vProjectCulturePlanRecord;
    validMessageProjectCulture: ValidMessage[] = [];

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectCulturePlansService: ProjectCulturePlansService,    
        private dialog: RxDialog,
        private popup:RxPopup,
        private applicationBroadcaster:ApplicationBroadcaster
    ) { 
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR); 
        activatedRoute.params.subscribe((param: any) => 
        {
            this.projectCulturePlanId = param['projectCulturePlanId'];
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });   
     }

    ngOnInit(): void {
        this.isAdd = false;
        this.plan_categories = [
            {
                "culturePlanCategoryId": 72,
                "culturePlanCategoryName": "Plan to Build rapport by"
            },
            {
                "culturePlanCategoryId": 73,
                "culturePlanCategoryName": "How the meeting must run"
            },
            {
                "culturePlanCategoryId": 74,
                "culturePlanCategoryName": "What to say"
            },
            {
                "culturePlanCategoryId": 75,
                "culturePlanCategoryName": "What not to say"
            },
            {
                "culturePlanCategoryId": 76,
                "culturePlanCategoryName": "How To Act"
            },
            {
                "culturePlanCategoryId": 77,
                "culturePlanCategoryName": "Gestures To Avoid"
            },
        ];
                          
        this.projectCulturePlansService.getBy([this.projectModuleId]).subscribe(            
            (response: any) => { 
                        this.culture_plan_categories = this.plan_categories;
                        this.culturePlans = response;
                        for(var j: number = 0; j< this.culturePlans.length; j++) {                
                            this.culturePlans[j]["isActive"] = true;
                        }

                        let parentIndex = 0;
                        
                        // this.plan_categories.forEach(element => {
                        //     this.validMessageProjectCulture.push([]);
                        //     this.culturePlans.forEach(c_element => {
                        //         this.validMessageProjectCulture[parentIndex].push(new ValidMessage());
                        //     });
                        //     parentIndex++;
                        // });
                        this.showComponent = true;
                    });
    }


    addProjectCulturePlan(projectCulturePlan: ProjectCulturePlan): void {
        if (projectCulturePlan.projectCulturePlanValue.length > 0) {
            if (projectCulturePlan && projectCulturePlan.projectCulturePlanValue && projectCulturePlan.projectCulturePlanValue.length <= 200) {
                this.addSubscription = this.projectCulturePlansService.post(projectCulturePlan).subscribe(t => {
                    let recentCulturePlan = new ProjectCulturePlan();
                    recentCulturePlan.projectCulturePlanId = t.projectCulturePlanId;
                    recentCulturePlan.projectModuleId = this.projectModuleId;
                    recentCulturePlan.culturePlanCategoryId = this.addProjectCulturePlanEntity.culturePlanCategoryId;
                    recentCulturePlan.projectCulturePlanValue = this.addProjectCulturePlanEntity.projectCulturePlanValue;
                    recentCulturePlan["isActive"] = true;
                    this.addProjectCulturePlanEntity = recentCulturePlan;
                    this.culturePlans.push(this.addProjectCulturePlanEntity);
                    this.isAdd = false;
                },
                    error => {
                        this.toast.show(error.ProjectCulturePlanValue, { status: 'error' });
                    })
            }
            else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 200)
                    this.toast.show(maxLength, { status: 'error' });
                }
            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }
   
    deleteProjectCulturePlan(vProjectCulturePlanRecord: vProjectCulturePlanRecord,rowIndex: number):void{
        this.culturePlans[rowIndex]["isActive"] = false;
        this.dialog.confirmation([vProjectCulturePlanRecord.projectCulturePlanValue], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.projectCulturePlansService.delete(vProjectCulturePlanRecord.projectCulturePlanId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.culturePlans.splice(rowIndex,1);
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
            }
            else{
                
                this.isAdd=false;
                this.culturePlans[rowIndex] = vProjectCulturePlanRecord;
                this.culturePlans[rowIndex]["isActive"] = true;
            }
		});
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    addCulturePlan(culturePlanCategoryId : any ):void{
        this.addProjectCulturePlanEntity = new ProjectCulturePlan();
        this.addProjectCulturePlanEntity.projectCulturePlanId = 0;
        this.addProjectCulturePlanEntity.projectModuleId = this.projectModuleId;
        this.addProjectCulturePlanEntity.projectCulturePlanValue = "";
        this.addProjectCulturePlanEntity.culturePlanCategoryId = culturePlanCategoryId;
        this.addProjectCulturePlanEntity["isActive"] = true;
        this.isAdd = true;

        let ParentIndex = this.culture_plan_categories.findIndex(p => p.culturePlanCategoryId == culturePlanCategoryId)
        //this.validMessageProjectCulture[ParentIndex].push(new ValidMessage());

        this.onSearchChangeProjectCulture('', ParentIndex,true);
    }

    onSearchChangeProjectCulture(value, ParentIndex, isFirstTime: boolean = false) {
        
        this.validMessageProjectCulture[ParentIndex] = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectCulturePlanFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}

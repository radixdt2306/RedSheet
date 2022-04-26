import { Component, OnInit, OnDestroy , Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick,RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  ProjectNegotionality, vProjectNegotionalityRecord, ProjectModule, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectNegotionalitiesService } from '../project-negotionalities.service';
import { ProjectNegotionalityDomain } from '../domain/project-negotionality.domain';
//import { ProjectNegotionalityLookupGroup } from '../domain/project-negotionality.models';

import { OurTeamMemberListComponent } from 'app/components/project-negotionality/our-team-members/list/our-team-member-list.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { ProjectModulesService } from 'app/components/project-module/project-modules/project-modules.service';
import { error } from 'selenium-webdriver';
import { vProjectModuleRecord } from 'app/database-models/v-project-module-record';
import { ProjectNegotionalityLookupGroup } from 'app/components/project-negotionality/project-negotionalities/domain/project-negotionality.models';

import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED,NEGOTIONALITY_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';

import { NEGOTIONALITY_CATEGORIES } from 'app/database-collections';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';


@Component({
    templateUrl: './project-negotionality-edit.component.html',
	entryComponents : [ OurTeamMemberListComponent,  ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectNegotionalityEditComponent extends ProjectNegotionalityDomain implements OnInit, OnDestroy {
    showTeamMember:boolean = true;
    isLocked: boolean = false;
    showComponent:boolean = false;
    projectNegotionalityFormGroup: FormGroup;
    projectModuleFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription:Subscription;
    lockSubscription:Subscription;
    projectNegotionalityLookupGroup: ProjectNegotionalityLookupGroup;
    projectNegotionalityId: number;
    projectModuleId: number;    
    negotionalityCategories:any;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectNegotionalitiesService: ProjectNegotionalitiesService,
        private projectModulesService: ProjectModulesService,    
        private dialog: RxDialog,
        private popup:RxPopup,
        private applicationBroadcaster:ApplicationBroadcaster
    ) { 
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);    
        activatedRoute.params.subscribe((param: any) => {
            this.projectNegotionalityId = param['projectNegotionalityId']
            this.projectModuleId = param['projectModuleId']
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
         });            
    }

    ngOnInit(): void {
        this.ourTeamMembers();
        //console.log(this.projectNegotionalityFormGroup);
    }

    getClassName(categoryName): string{        
        let className: string;
        switch(categoryName.toLowerCase())
        {
                case "critical":    
                    className= "redsheet redsheet-CSAL-C align-self-center";
                break;
                case "strategic":    
                    className= "redsheet redsheet-CSAL-S align-self-center";
                break;
                case "acquisition":    
                    className= "redsheet redsheet-CSAL-A align-self-center";
                break;
                case "leverage":    
                    className= "redsheet redsheet-CSAL-L align-self-center";
                break;
                default:
                    className = "redsheet redsheet-CSAL-C align-self-center";
                break;
        }
        return className;
        
    }

    ourTeamMembers()
    {
        
        this.negotionalityCategories = NEGOTIONALITY_CATEGORIES;
        this.projectNegotionalitiesService.getBy([this.projectNegotionalityId]).subscribe(            
            (response: vProjectNegotionalityRecord) => {     
                           
                let projectNegotionality = new ProjectNegotionality();
                if(this.projectNegotionalityId != 0)
                {
                    projectNegotionality.isMarketDifficult = response.isMarketDifficult;
                    projectNegotionality.isSpendLarge = response.isSpendLarge;
                    projectNegotionality.negotionalityCategoryId = response.negotionalityCategoryId;
                    //projectNegotionality.ourTeamMembers =response.ourTeamMembers;
                    projectNegotionality.negotionalityCategoryId = response.negotionalityCategoryId;
                    projectNegotionality.projectModuleId = this.projectModuleId;
                    projectNegotionality.projectNegotionalityId = this.projectNegotionalityId;
                }
                else
                {
                    projectNegotionality.isMarketDifficult = true;
                    projectNegotionality.isSpendLarge = true;
                    projectNegotionality.projectModuleId = this.projectModuleId;
                    projectNegotionality.negotionalityCategoryId = null;
                }
                this.projectNegotionalityFormGroup = this.validation.getFormGroup(projectNegotionality);
                this.showComponent = true;    
            });
            
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    addProjectNegotionality():void{
        this.showTeamMember = false;    
        this.projectNegotionalityFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
        this.addSubscription = this.projectNegotionalitiesService.post(this.projectNegotionalityFormGroup.value).subscribe(t => {            
            this.projectNegotionalityId = t.projectNegotionalityId;
            this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-negotionality/${this.projectModuleId}/project-negotionalities/${t.projectNegotionalityId}`,filterText:NEGOTIONALITY_CONST.value}); 
            this.router.navigate(["project-negotionality", this.projectModuleId, "project-negotionalities", t.projectNegotionalityId])
            this.ourTeamMembers();
            this.showTeamMember = true;    
            
        },
            error => {                
                this.toast.show(error,{status: 'error'})
                this.showTeamMember = true;  
            })
    }

    editProjectNegotionality():void{   
        this.showTeamMember = false;     
        if (this.projectNegotionalityId == 0) {
            this.addProjectNegotionality();                        
        } else{
            this.projectNegotionalityFormGroup.controls.projectNegotionalityId.setValue(this.projectNegotionalityId);
            this.projectNegotionalityFormGroup.controls.projectModuleId.setValue(this.projectModuleId);   
                     
            this.editSubscription = this.projectNegotionalitiesService.put(this.projectNegotionalityFormGroup.value).subscribe(t => {                   
                this.router.navigate(["project-negotionality", this.projectModuleId, "project-negotionalities", t.projectNegotionalityId])
                this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-negotionality/${this.projectModuleId}/project-negotionalities/${t.projectNegotionalityId}`,filterText:NEGOTIONALITY_CONST.value}); 
                    this.showTeamMember = true;    
            },
                error => {                    
                    this.toast.show(error,{status: 'error'})
                    this.showTeamMember = true;  
                })
        }
        
    }



	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectNegotionalityFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        if (this.lockSubscription)
            this.lockSubscription.unsubscribe();
        super.destroy();
    }
}

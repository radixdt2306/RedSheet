import { Component, OnInit, OnDestroy , Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick,RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  ProjectModuleReview, vProjectModuleReviewRecord, vProjectRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectModuleReviewsService } from '../project-module-reviews.service';
import { ProjectModuleReviewDomain } from '../domain/project-module-review.domain';
import { ProjectModuleReviewLookupGroup } from '../domain/project-module-review.models';
import { Console } from '@angular/core/src/console';
import { ProjectsService } from 'app/components/project/projects/projects.service';



@Component({
    selector:'app-project-module-review-edit',
    templateUrl: './project-module-review-edit.component.html',
    entryComponents : [RxMessageComponent]
})
export class ProjectModuleReviewEditComponent extends ProjectModuleReviewDomain implements OnInit, OnDestroy {
    showComponent:boolean = false;
    projectModuleReviewFormGroup: FormGroup;
    addSubscription: Subscription;
    editSubscription: Subscription;
    projectModuleReviewLookupGroup: ProjectModuleReviewLookupGroup;;
    projectModuleReviewRecord:vProjectModuleReviewRecord;
    projectModuleReviewId: number = 0;
    @Input()  projectModuleId :number;
    @Input() projectId :number;
    @Input() isProjectCompleted :boolean;    
    @Input() isOwner :boolean;    
    @Input() isReviewer: boolean;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectModuleReviewsService: ProjectModuleReviewsService,    
        private projectsService: ProjectsService,    
        private dialog: RxDialog,
        private popup:RxPopup        
    ) { 
        super();
            }

    ngOnInit(): void {      
        this.projectModuleReviewsService.getBy(this.projectModuleId,[this.projectModuleReviewId]).subscribe(
            (response: any) => {
                var isReviewer = this.isReviewer;
                 if(response == "")
                 {
                    var projectModuleReviewRecord = new ProjectModuleReview();
                    projectModuleReviewRecord.feedback = null;
                    projectModuleReviewRecord.projectModuleId = this.projectModuleId;
                   this.projectModuleReviewFormGroup = this.validation.getFormGroup(projectModuleReviewRecord);
                }                
                else
                {
                    this.projectModuleReviewRecord = new vProjectModuleReviewRecord(response);
                    this.projectModuleReviewId = this.projectModuleReviewRecord.projectModuleReviewId;
                    this.projectModuleReviewFormGroup = this.validation.getFormGroup(this.projectModuleReviewRecord);
                }         
                //this.projectModuleReviewFormGroup = this.validation.getFormGroup(this.projectModuleReviewRecord);                
                // this.projectsService.getBy([this.projectId]).subscribe(
                //     (response: vProjectRecord) => {
                //         ;
                //         console.log(response.isClosed);
                //         this.isProjectClosed = response.status;
                //         this.showComponent = true;
                //     });    
                this.showComponent = true;
               
            });

            
    }


    addProjectModuleReview(): void {
        
        this.addSubscription =  this.projectModuleReviewsService.post(this.projectModuleId, this.projectModuleReviewFormGroup.value).subscribe(t => {
        },
            error => {
                this.toast.show(error,{status: 'error'})
        })
    }

    editProjectModuleReview(): void {    
            
        if (this.projectModuleReviewId == 0) {
            this.addProjectModuleReview()
        } else {
        this.editSubscription =  this.projectModuleReviewsService.put(this.projectModuleId,this.projectModuleReviewFormGroup.value).subscribe(t => {
        },
            error => {                
                    //this.popup.validationFailed(error);
                    //this.popup.validationFailed(error);
                    this.toast.show(error.validationMessage, { status: 'error' });
        })
    }
    }

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectModuleReviewFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
``
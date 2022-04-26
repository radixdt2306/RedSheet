import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vOurRequirementDetail } from 'app/database-models';
import { OurRequirementDetailsService } from '../our-requirement-details.service';
import { OurRequirementDetailDomain } from '../domain/our-requirement-detail.domain';

import { OurRequirementDetailAddComponent } from 'app/components/project-requirement/our-requirement-details/add/our-requirement-detail-add.component';
import { OurRequirementDetailEditComponent } from 'app/components/project-requirement/our-requirement-details/edit/our-requirement-detail-edit.component';

import { REQUIREMENT_CATEGORIES } from 'app/database-collections';

@Component({
    selector:'app-our-requirement-detail-list',
    templateUrl: './our-requirement-detail-list.component.html',
	entryComponents : [ OurRequirementDetailAddComponent,  OurRequirementDetailEditComponent, ]
})
export class OurRequirementDetailListComponent extends OurRequirementDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    ourRequirementDetails: vOurRequirementDetail[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;    
    ourCatId: number;
    theirCatId: number;
    
    @Input()  projectRequirementId :number;
    @Input()  projectModuleId :number;
    @Input()  requirementCategoryId :number;
    @Input()  ourProjectRequirementId :number;
    @Input() theirProjectModuleId: number;
    @Input() isLocked:boolean;

    @Output() dataLoaded:EventEmitter<number> = new EventEmitter<number>();
    constructor(
        private ourRequirementDetailsService: OurRequirementDetailsService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {        
        if (this.listSubscription)
            this.listSubscription.unsubscribe();            
            let rCategoryId = this.requirementCategoryId;
        
        this.ourCatId = REQUIREMENT_CATEGORIES[0].requirementCategoryId;
        this.theirCatId = REQUIREMENT_CATEGORIES[1].requirementCategoryId;
        if(this.requirementCategoryId != this.ourCatId)
        {
            this.listSubscription = this.ourRequirementDetailsService.get(this.ourProjectRequirementId).subscribe(ourRequirementDetails => {            
                this.ourRequirementDetails = ourRequirementDetails;
                this.dataLoaded.emit(this.ourRequirementDetails.length);
                this.showComponent = true;  
                
            });

        }
        else
        {
           // console.log(this.projectRequirementId);
            this.listSubscription = this.ourRequirementDetailsService.get(this.projectRequirementId).subscribe(ourRequirementDetails => {            
                this.ourRequirementDetails = ourRequirementDetails;
                this.dataLoaded.emit(this.ourRequirementDetails.length);
                this.showComponent = true;  
            });
        }
    }

	showOurRequirementDetailAddComponent(vOurRequirementDetail: vOurRequirementDetail,theirProjectModuleId: number): void {        
        document.body.className = "modal-open";
        this.popup.show(OurRequirementDetailAddComponent, {projectModuleId:this.projectModuleId,requirementCategoryId:this.requirementCategoryId, projectRequirementId: this.projectRequirementId, ourRequirementDetailId: vOurRequirementDetail.ourRequirementDetailId, theirProjectModuleId: theirProjectModuleId }).then(t => this.resetRequiredId(t.id));
    }
	showOurRequirementDetailEditComponent(vOurRequirementDetail: vOurRequirementDetail): void {
        document.body.className = "modal-open";
        this.popup.show(OurRequirementDetailEditComponent, {projectModuleId:this.projectModuleId,requirementCategoryId:this.requirementCategoryId, projectRequirementId: this.projectRequirementId, ourRequirementDetailId: vOurRequirementDetail.ourRequirementDetailId }).then(t => this.ngOnInit());
    }

    resetRequiredId(projectRequirementId): void {   
        this.projectRequirementId = projectRequirementId;
        if(this.requirementCategoryId != this.ourCatId)
        {
            this.listSubscription = this.ourRequirementDetailsService.get(this.ourProjectRequirementId).subscribe(ourRequirementDetails => {            
                this.ourRequirementDetails = ourRequirementDetails;
                this.dataLoaded.emit(this.ourRequirementDetails.length);
                this.showComponent = true;  
                
            });

        }
        else
        {
            //console.log(this.projectRequirementId);
            this.listSubscription = this.ourRequirementDetailsService.get(this.projectRequirementId).subscribe(ourRequirementDetails => {            
                this.ourRequirementDetails = ourRequirementDetails;
                this.dataLoaded.emit(this.ourRequirementDetails.length);
                this.showComponent = true;  
            });
        }
    }

    showOurRequirementDetailDeleteComponent(vOurRequirementDetail: vOurRequirementDetail): void {
		this.dialog.confirmation([vOurRequirementDetail.requirement], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.ourRequirementDetailsService.delete(this.projectRequirementId,vOurRequirementDetail.ourRequirementDetailId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
					this.ngOnInit();
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
			}
		});
	}


    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

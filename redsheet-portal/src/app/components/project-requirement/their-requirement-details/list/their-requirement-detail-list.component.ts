import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vTheirRequirementDetail } from 'app/database-models';
import { TheirRequirementDetailsService } from '../their-requirement-details.service';
import { TheirRequirementDetailDomain } from '../domain/their-requirement-detail.domain';

import { TheirRequirementDetailAddComponent } from 'app/components/project-requirement/their-requirement-details/add/their-requirement-detail-add.component';
import { TheirRequirementDetailEditComponent } from 'app/components/project-requirement/their-requirement-details/edit/their-requirement-detail-edit.component';
import { REQUIREMENT_CATEGORIES } from 'app/database-collections';

@Component({
    selector:'app-their-requirement-detail-list',
    templateUrl: './their-requirement-detail-list.component.html',
	entryComponents : [ TheirRequirementDetailAddComponent,  TheirRequirementDetailEditComponent, ]
})
export class TheirRequirementDetailListComponent extends TheirRequirementDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    theirRequirementDetails: vTheirRequirementDetail[];
    listSubscription: Subscription;
    deleteSubscription:Subscription;
    ourCatId: number;
    theirCatId: number;
	@Input()  projectRequirementId :number;
    @Input() projectModuleId : number;
    @Input()  requirementCategoryId :number;
    constructor(
        private theirRequirementDetailsService: TheirRequirementDetailsService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.theirRequirementDetailsService.get(this.projectRequirementId).subscribe(theirRequirementDetails => {
            this.theirRequirementDetails = theirRequirementDetails;
            this.showComponent = true;
        });
    }

	showTheirRequirementDetailAddComponent(vTheirRequirementDetail: any): void {
        document.body.className = "modal-open";
        this.popup.show(TheirRequirementDetailAddComponent, {projectModuleId:this.projectModuleId,projectRequirementId:this.projectRequirementId, theirRequirementDetailId: vTheirRequirementDetail.theirRequirementDetailId }).then(t => this.resetRequiredId(t.id));
    }
	showTheirRequirementDetailEditComponent(vTheirRequirementDetail: vTheirRequirementDetail): void {
        document.body.className = "modal-open";
        this.popup.show(TheirRequirementDetailEditComponent, {projectModuleId:this.projectModuleId,projectRequirementId:this.projectRequirementId, theirRequirementDetailId: vTheirRequirementDetail.theirRequirementDetailId }).then(t => this.ngOnInit());
    }

    showTheirRequirementDetailDeleteComponent(vTheirRequirementDetail: vTheirRequirementDetail): void {
		this.dialog.confirmation([vTheirRequirementDetail.requirement], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.theirRequirementDetailsService.delete(this.projectRequirementId,vTheirRequirementDetail.theirRequirementDetailId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
					this.ngOnInit();
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
			}
		});
    }
    resetRequiredId(projectRequirementId): void {   
        this.projectRequirementId = projectRequirementId;
        this.listSubscription = this.theirRequirementDetailsService.get(this.projectRequirementId).subscribe(theirRequirementDetails => {
            this.theirRequirementDetails = theirRequirementDetails;
            this.showComponent = true;
        });
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}

import { Component, OnInit, OnDestroy ,Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import {RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  ProjectImplementationPlan, } from 'app/database-models';
import { ProjectModuleDomain } from 'app/components/project-module/project-modules/domain/project-module.domain';

@Component({    
    templateUrl: './project-module-help-detail.component.html',
    entryComponents : [RxMessageComponent]
})
export class ProjectModuleHelpDetailComponent extends ProjectModuleDomain implements OnInit,OnDestroy,ComponentCanDeactivate  {
    showComponent:boolean = false;
    projectImplementationPlanFormGroup: FormGroup;
    addSubscription: Subscription;

	@Input()  HTMLHelp :string;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,        
         private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) 
    {
        super();
        //this.popup.setComponent(componentFactoryResolver);
    }

       
    hideProjectModuleHelpDetailComponent():void{
        
        this.popup.hide(ProjectModuleHelpDetailComponent);
    }


    ngOnInit(): void {			
        	
                this.showComponent = true;
    }

    
	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        //return !this.projectModuleFormGroup.dirty;
        return true;
    }

    ngOnDestroy(): void {
        // if (this.editSubscription)
        //     this.editSubscription.unsubscribe();
        //super.destroy();
    }
}

import { Component, OnInit, OnDestroy ,Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import {RxToast, RxDialog, DialogClick } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  ProjectZoma, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectZomasService } from '../project-zomas.service';
import { ProjectZomaDomain } from '../domain/project-zoma.domain';
import { ProjectZomaLookupGroup } from '../domain/project-zoma.models';


@Component({
    templateUrl: './project-zoma-add.component.html',
    entryComponents : [RxMessageComponent]
})
export class ProjectZomaAddComponent extends ProjectZomaDomain implements OnInit, OnDestroy, ComponentCanDeactivate  {
    showComponent:boolean = false;
    projectZomaFormGroup: FormGroup;
    addSubscription: Subscription;
    projectZomaLookupGroup: ProjectZomaLookupGroup;;
	@Input()  projectModuleId :number;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private projectZomasService: ProjectZomasService,    
    ) {
        super();
    }

    ngOnInit(): void {
				this.projectZomaLookupGroup = new ProjectZomaLookupGroup();

                this.projectZomaLookupGroup.projectZoma = new ProjectZoma();
                this.projectZomaFormGroup = this.validation.getFormGroup(this.projectZomaLookupGroup.projectZoma);
                this.showComponent = true;
    }


    addProjectZoma(): void {
        this.addSubscription =  this.projectZomasService.post(this.projectModuleId,this.projectZomaFormGroup.value).subscribe(t => {
            
        },
            error => {
                
        })
    }

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectZomaFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}

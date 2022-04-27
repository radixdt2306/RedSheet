import { Component, OnInit, OnDestroy , Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick,RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectModuleDomain } from 'app/components/project-module/project-modules/domain/project-module.domain';
import { ProjectModulesService } from 'app/components/project-module/project-modules/project-modules.service';
import { vProjectModuleRecord, ProjectModule } from 'app/database-models';

@Component({
    selector:'project-detail',
    templateUrl: './project-detail.component.html',    
})
export class ProjectDetailComponent extends ProjectModuleDomain implements OnInit, OnDestroy {    
    showComponent:boolean = false;
    @Input() projectModuleId:any;
    projectModuleFormGroup: FormGroup;
    isVisibleReadOnlyText: boolean = false;

    constructor(
        private projectModulesService: ProjectModulesService,    
        private validation: RxValidation,
        private popup:RxPopup
    ) { 
        super();
    }

    ngOnInit(): void {
        this.projectModulesService.getBy([this.projectModuleId]).subscribe(
            (response: vProjectModuleRecord) => {
                this.projectModuleFormGroup = this.validation.getFormGroup(response);
                if (this.projectModuleFormGroup && this.projectModuleFormGroup.value && this.projectModuleFormGroup.value.isClosed) {
                    this.isVisibleReadOnlyText = true;
                }
                this.showComponent = true;
            });
        
    }
    

    ngOnDestroy(): void {
        super.destroy();
    }
}

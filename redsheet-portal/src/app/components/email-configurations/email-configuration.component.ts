import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';


import { EmailConfigurationDomain } from './domain/email-configuration.domain';
import { EmailConfiguration } from "app/database-models";
import { EmailConfigurationService } from "./email-configuration.service";

@Component({
    templateUrl: './email-configuration.component.html',
    entryComponents: [RxMessageComponent]
})
export class EmailConfigurationComponent extends EmailConfigurationDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    emailConfigurationFormGroup: FormGroup;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private componentFactoryResolver: ComponentFactoryResolver,
        private emailConfigurationService: EmailConfigurationService,
    ) {
        super();
        this.validationFailed = {};
     }

    ngOnInit(): void {
        this.emailConfigurationService.get().subscribe(emailConfigurationData => {
            if (emailConfigurationData.length != 0)
                 this.emailConfigurationFormGroup = this.validation.getFormGroup(new EmailConfiguration(emailConfigurationData[0]));
            else
            {
                this.emailConfigurationFormGroup = this.validation.getFormGroup(new EmailConfiguration());
            }
            this.showComponent = true;
        })
    }
    resetEmailConfigurations(): void{
        this.emailConfigurationFormGroup.reset(new EmailConfiguration())
        this.ngOnInit();
    }
    saveEmailConfigurations(): void{
        this.emailConfigurationService.put(this.emailConfigurationFormGroup.value).subscribe(t => { }, error => {
            if (!error.status) {
                this.validationFailed = error;
            }
        });
        
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

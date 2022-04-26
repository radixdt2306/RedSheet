import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation } from '@rx/forms';


import { GlobalSettingsDomain } from './domain/global-settings.domain';
import { CommonLookups } from "app/lookups/CommonLookups";
import { GlobalSettingsLookupGroup } from "app/components/global-settings/domain/global-settings.models";
import { GlobalSetting } from "app/database-models";
import { GlobalSettingsService } from "./global-settings.service";

@Component({
    templateUrl: './global-settings.component.html',
})
export class GlobalSettingsComponent extends GlobalSettingsDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    globalSettingsFormGroup: FormGroup;
    globalSettingsLookupGroup:GlobalSettingsLookupGroup;
    constructor(
        private validation: RxValidation,
        private componentFactoryResolver: ComponentFactoryResolver,
        private GlobalSettingservice: GlobalSettingsService,
    ) { super();
     }

    ngOnInit(): void {
         this.GlobalSettingservice.lookup([CommonLookups.activeLanguages, CommonLookups.applicationTimeZone]).then((response: GlobalSettingsLookupGroup) => {
                this.globalSettingsLookupGroup = new GlobalSettingsLookupGroup();
                this.globalSettingsLookupGroup = response;
                this.GlobalSettingservice.get().subscribe(GlobalSettingData=>{
                    if(GlobalSettingData != null)
                        this.globalSettingsFormGroup = this.validation.getFormGroup(new GlobalSetting(GlobalSettingData[0]));
                    else
                    {
                       this.globalSettingsFormGroup = this.validation.getFormGroup(new GlobalSetting());
                    }
                    this.showComponent = true;
                })
            });
    }
    resetGlobalSettings():void{
        this.globalSettingsFormGroup.reset(new GlobalSetting())
        this.ngOnInit();
    }
    saveGlobalSettings(): void{
        this.GlobalSettingservice.put(this.globalSettingsFormGroup.value).subscribe(t => { });
        
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

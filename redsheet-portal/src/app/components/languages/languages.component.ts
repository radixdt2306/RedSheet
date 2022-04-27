import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, } from '@rx/view';
import { RxValidation } from '@rx/forms';

import { vLanguage } from 'app/database-models'
import { LanguagesService } from './languages.service';

import { LanguagesDomain } from './domain/languages.domain';

@Component({
    templateUrl: './languages.component.html'
})
export class LanguagesComponent extends LanguagesDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    languages: vLanguage[];;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private languageService: LanguagesService
    ) { super(); }

    ngOnInit(): void {
        this.languageService.get().subscribe(languages => {
            this.languages = languages;
            this.showComponent = true;
        });
    }
    updateLanguage(languageGridObject: vLanguage): void{
        languageGridObject.active = !languageGridObject.active;
        this.listSubscription = this.languageService.put(languageGridObject).subscribe(t => {
            this.listSubscription.unsubscribe();
            this.ngOnInit();
        }, error => {
          
        });
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

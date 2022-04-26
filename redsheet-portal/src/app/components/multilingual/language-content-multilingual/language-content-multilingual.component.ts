import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, DialogClick, RxDialog, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ApplicationConfiguration } from "@rx/core"

import { LanguageContent, vLanguage, Language } from 'app/database-models'
import { LanguageContentMultilingualService } from './language-content-multilingual.service';
import { LanguageContentViewModel, LanguageContentMultilinguallookupGroup } from "./domain/language-content-multilingual.models";
import { LanguageContentMultilingualDomain } from "./domain/language-content-multilingual.domain";
import { CommonLookups } from "app/lookups/CommonLookups";


@Component({
    templateUrl: './language-content-multilingual.component.html',
})
export class LanguageContentMultilingualComponent extends LanguageContentMultilingualDomain implements OnInit, OnDestroy {
    listSubscription: Subscription;
    currentLanguage: Language;
    languageContent: LanguageContentViewModel;
    languagesContents: LanguageContentViewModel[];
    allLanguagesContents: LanguageContent[];
    languageContentMultilinguallookupGroup: LanguageContentMultilinguallookupGroup;
    showComponent = false;
    languageHeaders = [];
    languageBody = [];
    selectedLanguages: any;
    languageId: number;
    languages: Language[];
    defaultLanguage: string;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private componentFactoryResolver: ComponentFactoryResolver,
        private languageContentMultilingualService: LanguageContentMultilingualService,
        private dialog: RxDialog,
    ) { super(); }

    ngOnInit(): void {
        this.languages = ApplicationConfiguration.get("languages");
        this.defaultLanguage = ApplicationConfiguration.getDefaultLanguage();
        this.currentLanguage = this.languages.where(t => t.languageName == this.defaultLanguage)[0];
        this.languageId = this.currentLanguage.languageId;
        this.searchLanguageContentMultilingual(this.currentLanguage.languageId, this.defaultLanguage);
    }

    focused(languageContent: LanguageContentViewModel) {
        this.languageContent = new LanguageContentViewModel();
        for (var col in languageContent) {
            this.languageContent[col] = languageContent[col]
        }
    }

    searchLanguageContentMultilingual(languageId: number, languageName: string): void {
        setTimeout(() => {
            this.languageHeaders = ["Actions", "Language Content Name", "English", languageName]
            this.languageContentMultilingualService.getBy([languageId]).subscribe(t => {
                this.languagesContents = t;
                this.showComponent = true;
            })
        },500)
    }

    languageChanged(languageId: number): void {
        this.currentLanguage = this.languages.where(t => t.languageId == languageId)[0];
        this.searchLanguageContentMultilingual(this.currentLanguage.languageId, this.currentLanguage.languageName);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
    deleteLanguageContent(languageContent: LanguageContentViewModel): void {
        this.listSubscription = this.languageContentMultilingualService.delete(languageContent.languageContentId).subscribe(t => {
            this.listSubscription.unsubscribe();
            this.ngOnInit();
        });
    }

    updateLanguageContent(languageContent: LanguageContentViewModel) {
        var languageContentObject: any = {
            contentId: languageContent.languageContentId,
        }
        if (this.languageContent != languageContent) {
            if (this.languageContent.english != languageContent.english) {
                languageContentObject.value = languageContent.english;
                languageContentObject.languageName = 'English';
            } else if (this.languageContent.multilingual != languageContent.multilingual) {
                languageContentObject.value = languageContent.multilingual;
                languageContentObject.languageName = this.currentLanguage.languageName;
            }
            if (languageContentObject.languageName != null) {
                this.languageContentMultilingualService.put(languageContentObject).subscribe(t => {
                   this.searchLanguageContentMultilingual(this.currentLanguage.languageId, this.currentLanguage.languageName);
                });
            }
        }
    }
}

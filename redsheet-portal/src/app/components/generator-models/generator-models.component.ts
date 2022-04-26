import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { GeneratorModelsDomain } from "app/components/generator-models/domain/generator-models.domain";
import { GeneratorModelsService } from "app/components/generator-models/generator-models.service";
import { GeneratorModels } from "app/generator-models";


@Component({
    templateUrl: './generator-models.component.html',
    providers:[GeneratorModelsService]
})
export class GeneratorModelsComponent extends GeneratorModelsDomain implements OnInit, OnDestroy {
    generatorModels: GeneratorModels[];
    listSubscription: Subscription;
    showComponent = false;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private generatorModelsService: GeneratorModelsService
    ) { super(); }
    ngOnInit(): void {
        this.generatorModelsService.get().subscribe(generatorModels => {
            this.generatorModels = generatorModels;
            this.showComponent = true;
        });
    }
    updateGeneratorModels(generatorModels:GeneratorModels) : void{
        this.generatorModelsService.put(generatorModels).subscribe(generatorModels => {
        });
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

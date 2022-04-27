import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vPowerTypeDetail } from 'app/database-models';
import { PowerTypeDetailsService } from '../power-type-details.service';
import { PowerTypeDetailDomain } from '../domain/power-type-detail.domain';


@Component({
    selector:'app-power-type-detail-list',
    templateUrl: './power-type-detail-list.component.html',
})
export class PowerTypeDetailListComponent extends PowerTypeDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    powerTypeDetails: vPowerTypeDetail[];
    listSubscription: Subscription;
    
	@Input()  projectPowerId :number;

    constructor(
        private powerTypeDetailsService: PowerTypeDetailsService,    
        private dialog: RxDialog,
		private router: Router,
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.powerTypeDetailsService.get(this.projectPowerId).subscribe(powerTypeDetails => {
            this.powerTypeDetails = powerTypeDetails;
            this.showComponent = true;
        });
    }



    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}

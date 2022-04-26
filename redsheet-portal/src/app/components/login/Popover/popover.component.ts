import { Component, Input, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxPopup } from '@rx/view';


@Component({
    templateUrl: './popover.component.html',
    selector: 'popover'
})
export class PopoverComponent implements OnInit {
    showComponent: boolean = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private popup: RxPopup,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
     
    }

    ngOnInit(): void {        
        this.showComponent = true;
    }
    // ngOnDestroy(): void {
    //     //super.destroy();
    // }
}

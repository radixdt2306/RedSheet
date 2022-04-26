import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: './orientation-video.component.html'
})

export class OrientationVideoComponent implements OnInit {
    showComponent: boolean = false;

    constructor(private popup: RxPopup) { }

    ngOnInit(): void {
        this.showComponent = true;
    }

    hideOrientationVideo(): void {
        document.body.className = "";
        this.popup.hide(OrientationVideoComponent);
    }
}
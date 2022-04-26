import { Directive, OnInit, Input, Renderer, ElementRef, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: '[appHtml]',
})
export class AppHtmlDirective implements OnInit {
    @Input('appHtml') data: string;
    @Output() loadEvent: EventEmitter<any> = new EventEmitter<any>();
    
    element: HTMLDivElement;
    constructor(private renderer: Renderer, private elementRef: ElementRef,
    ) {
        this.element = elementRef.nativeElement as HTMLDivElement;
    }
    ngOnInit() {
        if (this.data)
        {
            this.element.insertAdjacentHTML('beforeend', this.data);
            this.loadEvent.emit();
        }
    }
}
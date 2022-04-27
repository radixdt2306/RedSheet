import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHtmlDirective } from './apphtml.directive';



@NgModule({
  declarations: [
    AppHtmlDirective      
  ],
  imports: [
       CommonModule,
  ],
  providers: [],
  exports: [AppHtmlDirective],
  bootstrap: []
})
export class AppDirectiveModule { }

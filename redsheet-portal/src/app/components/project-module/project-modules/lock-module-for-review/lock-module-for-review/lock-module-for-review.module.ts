import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockModuleForReviewComponent } from '../lock-module-for-review.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [LockModuleForReviewComponent],
  entryComponents:[LockModuleForReviewComponent]
})
export class LockModuleForReviewModule { }

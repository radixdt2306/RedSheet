import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailReplyComponent } from './email-reply.component';
import { EmailReplyService } from '../email-reply.service';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [EmailReplyComponent],
  providers: [EmailReplyService],
  entryComponents:[EmailReplyComponent]
  
})
export class EmailReplyModule { }

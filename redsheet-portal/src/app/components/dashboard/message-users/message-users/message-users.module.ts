import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageUsersComponent } from './message-users.component';
import { MessageUsersService } from '../message-users.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [MessageUsersComponent],
  providers:[MessageUsersService],
  entryComponents:[MessageUsersComponent]
})
export class MessageUsersModule { }

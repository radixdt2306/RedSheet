import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageUsersComponent } from './message-users.component';
import { MessageUsersService } from '../message-users.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'app/components/users/users.service';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [MessageUsersComponent],
  providers:[MessageUsersService,UsersService],
  entryComponents:[MessageUsersComponent]
})
export class MessageUsersModule { }

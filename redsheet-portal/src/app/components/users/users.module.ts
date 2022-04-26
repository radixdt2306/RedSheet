import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { RxTableModule } from "@rx/table";
import { RxViewModule } from "@rx/view";
import { USERS_ROUTING } from "./users.routing";

@NgModule({
    imports: [USERS_ROUTING],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UsersModule { }

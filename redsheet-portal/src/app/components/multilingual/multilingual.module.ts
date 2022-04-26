import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { MULTILINGUAL_ROUTING } from "app/components/multilingual/multilingual.routing";

@NgModule({
    imports: [MULTILINGUAL_ROUTING],
    exports: [RouterModule],
    providers: []
})
export class MultilingualModule { }
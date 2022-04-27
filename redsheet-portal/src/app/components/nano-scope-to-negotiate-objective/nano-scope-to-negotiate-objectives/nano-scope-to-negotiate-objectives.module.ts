import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { NANO_SCOPE_TO_NEGOTIATE_OBJECTIVES_ROUTING } from './nano-scope-to-negotiate-objectives.routing';
import { NanoScopeToNegotiateObjectivesService } from './nano-scope-to-negotiate-objectives.service';

@NgModule({
    imports: [NANO_SCOPE_TO_NEGOTIATE_OBJECTIVES_ROUTING],
    exports: [RouterModule],
    providers: [NanoScopeToNegotiateObjectivesService]
})
export class NanoScopeToNegotiateObjectivesModule { }
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { redSheetFullPdfComponent } from './redSheet-full-pdf/redSheet-full-pdf';


const PDF_ROUTES: Routes = [{
    path: '', component: redSheetFullPdfComponent
},
];

export const PDF_ROUTING: ModuleWithProviders = RouterModule.forChild(PDF_ROUTES);
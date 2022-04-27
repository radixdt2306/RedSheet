import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { redSheetNanoPdfComponent } from 'app/components/redSheet-nano-report/redSheet-nano-pdf/redSheet-nano-pdf';




const PDF_ROUTES: Routes = [{
    path: '', component: redSheetNanoPdfComponent
},
];

export const PDF_ROUTING: ModuleWithProviders = RouterModule.forChild(PDF_ROUTES);
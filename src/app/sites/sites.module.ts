import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesListComponent } from './sites-list/sites-list.component';
import { RouterModule } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SitesTableComponent } from './sites-table/sites-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SiteFormComponent } from './site-form/site-form.component';



@NgModule({
  declarations: [
    SitesListComponent,
    SitesComponent,
    SitesTableComponent,
    SiteFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PipesModule,
    MatInputModule,
    MatIconModule
  ],
  exports:[
    SitesListComponent,
  ]
})
export class SitesModule { }

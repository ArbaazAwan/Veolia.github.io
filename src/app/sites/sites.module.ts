import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { SitesListComponent } from './sites-list/sites-list.component';
import { RouterModule } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SitesTableComponent } from './sites-table/sites-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SitesListComponent,
    SitesComponent,
    SitesTableComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
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

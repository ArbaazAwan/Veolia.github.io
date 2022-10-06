import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesComponent } from './sites.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { SitesListComponent } from './sites-list/sites-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SitesComponent,
    SitesListComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    RouterModule
  ]
})
export class SitesModule { }

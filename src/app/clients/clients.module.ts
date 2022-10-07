import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { SitesModule } from '../sites/sites.module';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    RouterModule,
    MatExpansionModule,
    SitesModule
  ],
  exports:[
    ClientsComponent,
    ClientsListComponent,
  ]
})
export class ClientsModule { }

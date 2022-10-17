import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { SitesModule } from '../sites/sites.module';
import { ClientstableComponent } from './clientstable/clientstable.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientstableComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    RouterModule,
    MatExpansionModule,
    SitesModule,
    SidenavModule,
    FormsModule,
  ],
  exports:[
    ClientsComponent,
    ClientsListComponent,
  ]
})
export class ClientsModule { }

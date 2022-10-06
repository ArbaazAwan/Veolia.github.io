import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';



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

  ],
  exports:[
    ClientsComponent,
    ClientsListComponent,
  ]
})
export class ClientsModule { }

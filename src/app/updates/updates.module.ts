import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsUpdatesCardComponent } from './clients-updates-card/clients-updates-card.component';
import { MoneyUpdatesCardComponent } from './money-updates-card/money-updates-card.component';
import { NewClientsUpdatesCardComponent } from './new-clients-updates-card/new-clients-updates-card.component';
import { UsersUpdatesCardComponent } from './users-updates-card/users-updates-card.component';
import { SalesUpdatesCardComponent } from './sales-updates-card/sales-updates-card.component';



@NgModule({
  declarations: [
    ClientsUpdatesCardComponent,
    MoneyUpdatesCardComponent,
    NewClientsUpdatesCardComponent,
    UsersUpdatesCardComponent,
    SalesUpdatesCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ClientsUpdatesCardComponent,
    MoneyUpdatesCardComponent,
    NewClientsUpdatesCardComponent,
    UsersUpdatesCardComponent,
    SalesUpdatesCardComponent,
  ]
})
export class UpdatesModule { }

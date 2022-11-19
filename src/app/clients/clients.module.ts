import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { SitesModule } from '../sites/sites.module';
import { ClientstableComponent } from './clientstable/clientstable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientstableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    SitesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PipesModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [ClientsComponent, ClientsListComponent],
})
export class ClientsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../search/search-filter.pipe.ts.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MasterModule } from '../master/master.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    UnitComponent,
    FilterPipe,
    
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    MasterModule,
    MatIconModule


  ],

  exports:[
    UnitComponent
  ]
})
export class UnitModule { }

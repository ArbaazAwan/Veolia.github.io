import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    AutocompleteLibModule,
    PipesModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }

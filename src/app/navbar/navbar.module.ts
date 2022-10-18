import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AutocompleteLibModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }

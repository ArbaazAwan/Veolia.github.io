import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { PipesModule } from '../pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
    PipesModule,
    NgbModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }

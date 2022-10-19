import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserstableComponent } from './userstable/userstable.component';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../pipes/pipes.module';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UsersComponent,
    UserstableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    PipesModule,
    NgbModule
  ]
})
export class UsersModule { }

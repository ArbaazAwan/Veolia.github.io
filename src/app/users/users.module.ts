import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserstableComponent } from './userstable/userstable.component';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserformComponent } from './userform/userform.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsersComponent, UserstableComponent, UserformComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    PipesModule,
    NgbModule,
    MatSelectModule,
    NgxPaginationModule,
  ],
})
export class UsersModule {}

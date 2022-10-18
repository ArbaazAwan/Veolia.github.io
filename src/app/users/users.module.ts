import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserstableComponent } from './userstable/userstable.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserstableComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    FooterModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { ModelTableComponent } from './model-table/model-table.component';



@NgModule({
  declarations: [
    ModelComponent,
    ModelTableComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    ReactiveFormsModule,
  ],
  exports:[
    ModelComponent,


  ]
})
export class ModelModule { }

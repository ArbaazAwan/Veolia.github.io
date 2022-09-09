import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTableCardComponent } from './projects-table-card.component';



@NgModule({
  declarations: [
    ProjectsTableCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProjectsTableCardComponent
  ]
})
export class ProjectTableModule { }

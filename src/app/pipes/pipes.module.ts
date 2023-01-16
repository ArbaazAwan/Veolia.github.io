import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { AscPipe } from './asc.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    AscPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SearchPipe,
    AscPipe
  ]
})
export class PipesModule { }

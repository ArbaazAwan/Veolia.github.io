import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {

  eventEvalTableShow: boolean = false;
  viewMaster:any;
  excelData: any;

  constructor() {}

  ngOnInit(): void {}

  onViewMaster(id:any){

    // this.masterService.getMasterById(id).subscribe((el: any) => {
    //   this.viewMaster = el[0]
    // });
  }

  // readExcel(event:any){

  //   let file = event.target.files[0];

  //   let fileReader = new FileReader();
  //   fileReader.readAsBinaryString(file);

  //   fileReader.onload = (e:any)=>{

  //     var workBook = XLSX.read(fileReader.result,{type:'binary'});
  //     var sheetNames = workBook.SheetNames;
  //     this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[2]]);
  //     console.log(this.excelData);
  //   }

  // }

}

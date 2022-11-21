import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss'],
})
export class ImportExcelComponent implements OnInit {
  excelData: any;
  constructor() {}

  ngOnInit(): void {}

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      // console.log(this.excelData);
      for (let index = 0; index < this.excelData.length; index++) {
        const data = this.excelData[index];
        const master = {
          oldAssetType: data.AssetType,
          masterStyle: data.Style,
          masterSize: data.Size,
          oldDescription: data.AppDesc,
          unitMeasurement: data.UnitMeas,
          rev: data.Rev,
          replacementCost: data.ReplCost,
          lifeMonths: data.Lifemos,
          overhaulLife: data.OHLife,
        };
        console.log(master);
      }
    };
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss'],
})
export class ImportExcelComponent implements OnInit {
  excelData: any;
  error: any;
  isLoading: any = false;

  constructor(private masterService: MasterService) {}
  @ViewChild('fileUpload') myInputVariable: ElementRef;

  ngOnInit(): void {}

  readExcel(event: any) {
    this.isLoading = true;
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets['master']);
      console.log(this.excelData.length > 0);
      if (this.excelData.length > 0) {
        // console.log(this.excelData);
        for (let index = 0; index < this.excelData.length; index++) {
          const data = this.excelData[index];
          const master = {
            siteId: localStorage.getItem('siteId'),
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
          const events = this.createEventsArray(data);
          const overhaul = this.createOverhaulArray(data);

          let completeMaster = {
            master: master,
            overhaul: overhaul,
            events: events, //events array
          };
          this.masterService
            .postCompleteMaster(completeMaster)
            .subscribe((res: any) => {
              console.log(res.message);
              if (res.message) {
                this.isLoading = false;
              }
              window.location.reload();
            });
        }
      } else {
        this.error = 'Excel sheet not supported.';
        // const element = document.getElementById('file-upload') as HTMLElement;
        this.myInputVariable.nativeElement.value = '';
      }
    };
  }

  createEventsArray(masterData: any) {
    var eventsArray: any = [];

    const totalEvent = 8;

    for (let eventIndex = 0; eventIndex < totalEvent; eventIndex++) {
      const i = eventIndex + 1;
      // finding maintenance in an event
      var eventMaintenancesArray: any = [];
      var pattern = 'Ev' + i + 'M.*';
      var re = new RegExp(pattern);
      let maintenanceLength = Object.keys(masterData).filter((key) =>
        re.test(key)
      );
      const mainLength = maintenanceLength.length / 2;
      // finding maintenance in an event

      // finding Labour in an event
      var eventLabourArray: any = [];
      var pattern = 'Ev' + i + 'L.*';
      var re = new RegExp(pattern);
      let labourLength = Object.keys(masterData).filter((key) => re.test(key));
      const LabLength = labourLength.length / 2;
      // finding Labour in an event

      // finding Contractor in an event
      var eventContractorsArray: any = [];
      var pattern = 'Ev' + i + 'C.*';
      var re = new RegExp(pattern);
      let contLength = Object.keys(masterData).filter((key) => re.test(key));
      const contratorLength = contLength.length / 2;
      // finding Contractor in an event

      const evTitle = 'Ev' + (eventIndex + 1) + 'title';
      const evOccurence = 'Ev' + (eventIndex + 1) + 'Every';
      const evStretch = 'Ev' + (eventIndex + 1) + 'Strch';
      for (let mainIndex = 0; mainIndex < mainLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'M' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'M' + (mainIndex + 1) + 'Cst';
        if (masterData[dataIndex] != undefined)
          eventMaintenancesArray.push({
            evMaintenance: masterData[dataIndex],
            evCost: masterData[cIndex],
          });
      }

      for (let mainIndex = 0; mainIndex < LabLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'L' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'L' + (mainIndex + 1) + 'Hr';
        if (masterData[dataIndex] != undefined)
          eventLabourArray.push({
            evLabour: masterData[dataIndex],
            evHour: masterData[cIndex],
          });
      }

      for (let mainIndex = 0; mainIndex < contratorLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'C' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'C' + (mainIndex + 1) + 'Cst';
        if (masterData[dataIndex] != undefined)
          eventContractorsArray.push({
            evContractor: masterData[dataIndex],
            evCost: masterData[cIndex],
          });
      }

      if (masterData[evTitle] != undefined) {
        eventsArray.push({
          evTitle: masterData[evTitle],
          evOccurence: masterData[evOccurence],
          evStretch: masterData[evStretch],
          eventMaintenance: eventMaintenancesArray,
          eventLabours: eventLabourArray,
          eventContractors: eventContractorsArray,
        });
      }
    }
    return eventsArray;
  }

  createOverhaulArray(masterData: any) {
    var overhaul: any = {};
    // finding Maintenance in Overhaul
    var pattern = 'OHM.*';
    var re = new RegExp(pattern);
    let ovLength = Object.keys(masterData).filter((key) => re.test(key));
    const ovMLength = ovLength.length / 2;
    // finding Maintenance in Overhaul
    var overhaulMaintenance: any = [];
    for (let mainIndex = 0; mainIndex < ovMLength; mainIndex++) {
      let dataIndex = 'OHM' + (mainIndex + 1);
      let cIndex = 'OHM' + (mainIndex + 1) + 'Cst';
      if (masterData[dataIndex] != undefined)
        overhaulMaintenance.push({
          ohMaintenance: masterData[dataIndex],
          ohCost: masterData[cIndex],
        });
    }

    // finding Labour in Overhaul
    var pattern = 'OHL.*';
    var re = new RegExp(pattern);
    let ovlLength = Object.keys(masterData).filter((key) => re.test(key));
    const ovLLength = ovlLength.length / 2;
    // finding Labour in Overhaul
    var overhaulLabours: any = [];
    for (let mainIndex = 0; mainIndex < ovLLength; mainIndex++) {
      let dataIndex = 'OHL' + (mainIndex + 1);
      let cIndex = 'OHL' + (mainIndex + 1) + 'Hr';
      if (masterData[dataIndex] != undefined)
        overhaulLabours.push({
          ohLabour: masterData[dataIndex],
          ohHour: masterData[cIndex],
        });
    }

    // finding Contractor in Overhaul
    var pattern = 'OHC.*';
    var re = new RegExp(pattern);
    let ovcLength = Object.keys(masterData).filter((key) => re.test(key));
    const ovCLength = ovcLength.length / 2;
    // finding Contractor in Overhaul
    var overhaulContractors: any = [];
    for (let mainIndex = 0; mainIndex < ovCLength; mainIndex++) {
      let dataIndex = 'OHC' + (mainIndex + 1);
      let cIndex = 'OHC' + (mainIndex + 1) + 'Cst';
      if (masterData[dataIndex] != undefined)
        overhaulContractors.push({
          ohLabour: masterData[dataIndex],
          ohHour: masterData[cIndex],
        });
    }

    overhaul = {
      ovTitle: masterData['OHtitle'],
      ovStretch: masterData['OHStrch'],
      overhaulMaintenance: overhaulMaintenance,
      overhaulLabours: overhaulLabours,
      overhaulContractors: overhaulContractors,
    };

    return overhaul;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MasterService } from '../master.service';
import { NodeService } from './node.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-view-master-table',
  templateUrl: './view-master-table.component.html',
  styleUrls: ['./view-master-table.component.scss'],
})
export class ViewMasterTableComponent implements OnInit {
  constructor(
    private masterService: MasterService,
    private nodeService: NodeService
  ) {}

  @Input() eventEvalTableShow!: boolean;

  completeMaster: any;
  master: any = {};
  overhaul: any = {};
  events!: any[];
  cols: any[] = [];
  asset: any;
  files!: TreeNode[];
  isLoading: boolean = false;

  ovMaterialsCost: number = 0;
  ovContractorsHours: number = 0;
  ovLaborBasicSkilled: number = 0;
  ovLaborUnskilled: number = 0;
  ovLaborTechnical: number = 0;
  ovLaborSpecialized: number = 0;
  ovLaborCertified: number = 0;
  ovLaborSupervisory: number = 0;

  evMaterialsCost: number[] = [];
  evContractorsCost: number[] = [];
  evLaborBasicSkilled: number[] = [];
  evLaborUnskilled: number[] = [];
  evLaborTechnical: number[] = [];
  evLaborSpecialized: number[] = [];
  evLaborCertified: number[] = [];
  evLaborSupervisory: number[] = [];

  ngOnInit(): void {
    this.masterService.currentMasterId.subscribe((el: any) => {
      if (el) {
        this.getCompleteMasterById(el);
      }
    });
  }

  getCompleteMasterById(masterId: any) {
    this.isLoading = true;
    this.masterService
      .getCompleteMasterById(masterId) //hard coded id
      .subscribe((el: any) => {
        // console.log("complete master:",el);

        this.completeMaster = el;
        this.files = this.nodeService.getFilesystem(this.completeMaster); //initializing nodes

        // console.log("files:",this.files);

        if (this.completeMaster) {
          if (this.completeMaster.master)
            this.master = this.completeMaster.master;

          if (this.completeMaster.events) {
            this.events = this.completeMaster.events;
            this.cols = [
              { field: 'desc', header: '' },
              { field: 'oh', header: 'Overhaul' },
            ];

            for (let i = 0; i < this.events.length; i++) {
              let totalCost: number = 0;
              this.events[i].eventMaintenance?.forEach((evM: any) => {
                totalCost += Number(evM.evCost);
              });
              this.evMaterialsCost.push(totalCost);

              let totalCostC: number = 0;
              this.events[i].eventContractors?.forEach((evC: any) => {
                totalCostC += Number(evC.evCost);
              });
              this.evContractorsCost.push(totalCostC);

              let evLaborB: number = 0;
              let evLaborU: number = 0;
              let evLaborT: number = 0;
              let evLaborS: number = 0;
              let evLaborC: number = 0;
              let evLaborSu: number = 0;

              this.events[i].eventLabours.forEach((res: any) => {
                switch (res.evLabour?.toLowerCase()) {
                  case 'basic skilled':
                    evLaborB += Number(res.evHour);
                    break;
                  case 'unskilled':
                    evLaborU += Number(res.evHour);
                    break;
                  case 'technical':
                    evLaborT += Number(res.evHour);
                    break;
                  case 'specialized':
                    evLaborS += Number(res.evHour);
                    break;
                  case 'certified':
                    evLaborC += Number(res.evHour);
                    break;
                  case 'supervisory':
                    evLaborSu += Number(res.evHour);
                    break;
                  default:
                    break;
                }
              });
              this.evLaborBasicSkilled.push(evLaborB);
              this.evLaborUnskilled.push(evLaborU);
              this.evLaborCertified.push(evLaborC);
              this.evLaborSpecialized.push(evLaborS);
              this.evLaborSupervisory.push(evLaborSu);
              this.evLaborTechnical.push(evLaborT);
            }

            for (let i = 0; i < this.events?.length; i++) {
              let obj = { field: 'ev' + (i + 1), header: 'Event ' + (i + 1) };
              this.cols.push(obj);
            }
          }

          if (this.completeMaster.overhaul) {
            this.overhaul = this.completeMaster.overhaul;

            this.calculatingOhMaterialCosts(this.overhaul);
            this.calculatingOhConts(this.overhaul);
            this.calculatingohLabors(this.overhaul);
          }
        }

        this.isLoading = false;
        this.masterService.setMasterId(null);
      });
  }

  exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || 'ExportResult';
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById('treetable');
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: prefix,
    });

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  calculatingOhMaterialCosts(overhaul: any) {
    overhaul.overhaulMaintenance.forEach((el: any) => {
      this.ovMaterialsCost += Number(el.ohCost);
    });
  }

  calculatingOhConts(overhaul: any) {
    overhaul.overhaulContractors.forEach((res: any) => {
      this.ovContractorsHours += Number(res.ohHour);
    });
  }

  calculatingohLabors(overhaul: any) {
    overhaul.overhaulLabours.forEach((res: any) => {
      switch (res.ohLabour?.toLowerCase()) {
        case 'basic skilled':
          this.ovLaborBasicSkilled += Number(res.ohHour);
          break;
        case 'unskilled':
          this.ovLaborUnskilled += Number(res.ohHour);
          break;
        case 'technical':
          this.ovLaborTechnical += Number(res.ohHour);
          break;
        case 'specialized':
          this.ovLaborSpecialized += Number(res.ohHour);
          break;
        case 'certified':
          this.ovLaborCertified += Number(res.ohHour);
          break;
        case 'supervisory':
          this.ovLaborSupervisory += Number(res.ohHour);
          break;
        default:
          break;
      }
    });
  }
}

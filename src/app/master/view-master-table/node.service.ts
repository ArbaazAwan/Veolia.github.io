import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Injectable({
  providedIn: 'any',
})
export class NodeService {
  constructor(private http: HttpClient) {}
  data!: TreeNode[];
  eventMaintenance: any = [];
  eventLabours:any = [];
  eventContractors:any = [];

  getFilesystem(completeMaster: any) {
    var events = completeMaster.events;
    var overhaul = completeMaster.overhaul;

    var titles: any = {
      desc: 'Title',
      oh: overhaul.ovTitle,
    };
    var occurences: any = {
      desc: 'Occurrence',
      oh: '',
    };
    var stretches: any = {
      desc: 'Stretch',
      oh: overhaul.ovStretch,
    };

    //___________________________________________

    for (let i = 0; i < events.length; i++) {
      titles['ev' + (i + 1)] = events[i].evTitle; //adding event titles
    }

    for (let i = 0; i < events.length; i++) {
      occurences['ev' + (i + 1)] = events[i].evOccurence;
    }

    for (let i = 0; i < events.length; i++) {
      stretches['ev' + (i + 1)] = events[i].evStretch;
    }

    this.data = [
      {
        data: titles,
      },
      {
        data: occurences,
      },
      {
        data: stretches,
      },
      {
        data: {
          desc: 'Material',
        },
        children: [],
      },
      {
        data: {
          desc: 'Labor',
        },
        children: [],
      },
      {
        data: {
          desc: 'Contractor',
        },
        children: [],
      },
    ];



    for (let index = 0; index < events.length; index++) {
      this.eventMaintenance = events[index].eventMaintenance;
    }

    for (let index = 0; index < events.length; index++) {
      this.eventLabours = events[index].eventLabours;
    }

    for (let index = 0; index < events.length; index++) {
      this.eventContractors = events[index].eventContractors;
    }

    console.log("overhaul labor",overhaul?.overhaulLabour);


    for (
      let mainIndex = 0;
      mainIndex < this.eventMaintenance.length;
      mainIndex++
    ) {
      var objI: any = {
        desc:"Item"
      };
      var objC: any = {
        desc:"Cost"
      };
      for (let index = 0; index < events.length; index++) {
        objI['ev' + (index + 1)] =
          events[index].eventMaintenance[mainIndex]?.evMaintenance;
        objC['ev' + (index + 1)] =
          events[index].eventMaintenance[mainIndex]?.evCost;
        objI['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohMaintenance;
        objC['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohCost;
      }
      this.data[3].children?.push({ data: objI });
      this.data[3].children?.push({ data: objC });
    }

    for (
      let mainIndex = 0;
      mainIndex < this.eventLabours.length;
      mainIndex++
    ) {
      var objL: any = {
        desc:"Labor"
      };
      var objH: any = {
        desc:"Hour"
      };
      for (let index = 0; index < events.length; index++) {
        objL['ev' + (index + 1)] =
          events[index].eventLabours[mainIndex]?.evLabour;
        objH['ev' + (index + 1)] =
          events[index].eventLabours[mainIndex]?.evHour;
        objL['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohLabour;
        objH['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohHour;
      }
      this.data[4].children?.push({ data: objL });
      this.data[4].children?.push({ data: objH });
    }

    for (
      let mainIndex = 0;
      mainIndex < this.eventContractors.length;
      mainIndex++
    ) {
      var objCC: any = {
        desc:"Labor"
      };
      var objCL: any = {
        desc:"Hour"
      };
      for (let index = 0; index < events.length; index++) {
        objCC['ev' + (index + 1)] =
          events[index].eventContractors[mainIndex]?.evContractor;
        objCL['ev' + (index + 1)] =
          events[index].eventContractors[mainIndex]?.evCost;
        objCC['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohLabour;
        objCL['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohHour;
      }
      this.data[5].children?.push({ data: objCC });
      this.data[5].children?.push({ data: objCL });
    }

    return this.data;
  }
}

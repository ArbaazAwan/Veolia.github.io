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
  eventLabours: any = [];
  eventContractors: any = [];

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
      titles['ev' + (i + 1)] = events[i].evTitle;
      occurences['ev' + (i + 1)] = events[i].evOccurence;
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
      this.eventMaintenance.push(events[index].eventMaintenance);
      this.eventLabours.push(events[index].eventLabours);
      this.eventContractors.push(events[index].eventContractors);
    }

    for (
      let mainIndex = 0;
      mainIndex < this.eventMaintenance.length;
      mainIndex++
    ) {
      var objI: any = {
        desc: 'Item',
      };
      var objC: any = {
        desc: 'Cost',
      };
      if (events.length <= 0) {
        //if no events then add only overhaul maintenance
        objI['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohMaintenance;
        objC['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohCost;
      }
      for (let index = 0; index < events.length; index++) {
        if (
          events[index].eventMaintenance[mainIndex]?.evMaintenance != undefined
        )
          objI['ev' + (index + 1)] =
            events[index].eventMaintenance[mainIndex].evMaintenance;
        if (events[index].eventMaintenance[mainIndex]?.evCost != undefined)
          objC['ev' + (index + 1)] =
            events[index].eventMaintenance[mainIndex].evCost;
        if (overhaul.overhaulMaintenance[mainIndex]?.ohMaintenance != undefined)
          objI['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohMaintenance;
        if (overhaul.overhaulMaintenance[mainIndex]?.ohCost != undefined)
          objC['oh'] = overhaul.overhaulMaintenance[mainIndex]?.ohCost;
      }
      var mainSize = Object.keys(objI).length;
      if (mainSize > 1) this.data[3].children?.push({ data: objI });
      var costSize = Object.keys(objI).length;
      if (costSize > 1) this.data[3].children?.push({ data: objC });
    }

    for (let mainIndex = 0; mainIndex < this.eventLabours.length; mainIndex++) {
      var objL: any = {
        desc: 'Labor',
      };
      var objH: any = {
        desc: 'Hour',
      };
      if (events.length <= 0) {
        //if no events then add only overhaul labors
        objL['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohLabour;
        objH['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohHour;
      }
      for (let index = 0; index < events.length; index++) {
        if (events[index].eventLabours[mainIndex]?.evLabour != undefined)
          objL['ev' + (index + 1)] =
            events[index].eventLabours[mainIndex]?.evLabour;
        if (events[index].eventLabours[mainIndex]?.evHour != undefined)
          objH['ev' + (index + 1)] =
            events[index].eventLabours[mainIndex]?.evHour;
        if (overhaul?.overhaulLabours[mainIndex]?.ohLabour != undefined)
          objL['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohLabour;
        if (overhaul?.overhaulLabours[mainIndex]?.ohHour != undefined)
          objH['oh'] = overhaul?.overhaulLabours[mainIndex]?.ohHour;
      }
      var labSize = Object.keys(objL).length;
      var hourSize = Object.keys(objH).length;
      if (labSize > 1) this.data[4].children?.push({ data: objL });
      if (hourSize > 1) this.data[4].children?.push({ data: objH });
    }

    for (
      let mainIndex = 0;
      mainIndex < this.eventContractors.length;
      mainIndex++
    ) {
      var objCC: any = {
        desc: 'Labor',
      };
      var objCL: any = {
        desc: 'Hour',
      };
      if (events.length <= 0) {
        objCC['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohLabour;
        objCL['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohHour;
      }
      for (let index = 0; index < events.length; index++) {
        if (
          events[index].eventContractors[mainIndex]?.evContractor != undefined
        )
          objCC['ev' + (index + 1)] =
            events[index].eventContractors[mainIndex]?.evContractor;
        if (events[index].eventContractors[mainIndex]?.evCost != undefined)
          objCL['ev' + (index + 1)] =
            events[index].eventContractors[mainIndex]?.evCost;
        if (overhaul?.overhaulContractors[mainIndex]?.ohLabour != undefined)
          objCC['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohLabour;
        if (overhaul?.overhaulContractors[mainIndex]?.ohHour != undefined)
          objCL['oh'] = overhaul?.overhaulContractors[mainIndex]?.ohHour;
      }
      var contSize = Object.keys(objCC).length;
      var contcostSize = Object.keys(objCL).length;
      if (contSize > 1) this.data[5].children?.push({ data: objCC });
      if (contcostSize > 1) this.data[5].children?.push({ data: objCL });
    }
    return this.data;
  }
}

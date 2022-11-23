import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Injectable({
  providedIn: 'any',
})
export class NodeService {
  constructor(private http: HttpClient) { }

  getFilesystem(completeMaster: any) {

    var events = completeMaster.events;
    var overhaul = completeMaster.overhaul;

    var titles: any = {
      desc: 'Title',
      oh: overhaul.ovTitle,
    };
    var occurences: any = {
      "desc": "Occurrence",
      "oh": ""
    };
    var stretches: any = {
      desc: 'Stretch',
      oh: overhaul.ovStretch,
    };

    //events objects______________________________

    //event maintenance objects
    var evMaintenancesI: any = {
      desc: 'Item',
      // oh: 'Cost',
    };
    var evMaintenancesC: any = {
      desc: 'Cost',
      // oh: '',
    };

    //event labors objects
    var evLaborsL: any = {
      desc: 'Level',
      oh: 'Labors',
    };
    var evLaborsH: any = {
      desc: 'Cost',
      oh: '',
    };

    //event contractors objects
    var evContractorsL: any = {
      desc: 'Desc',
      oh: 'oh Contractors/Shops',
    };
    var evContractorsH: any = {
      "desc": 'Hours',
      oh: '',
    };

    //__________________________________________


    //overhaul objects__________________________

    //overhaul maintenance objects
    var ovMaintenancesI: any = {
      desc: 'Item',
      oh: 'Overhaul Cost',
    };
    var ovMaintenancesC: any = {
      desc: 'Cost',
      oh: '',
    };

    //overhaul labors objects
    var ovLaborsL: any = {
      desc: 'Level',
      oh: 'Labors',
    };
    var ovLaborsH: any = {
      desc: 'Cost',
      oh: '',
    };

    //overhaul Contractors objects
    var ovContractorsL: any = {
      desc: 'Desc',
      oh: 'Contractors',
    };
    var ovContractorsH: any = {
      desc: 'Hours',
      oh: '',
    };

    //___________________________________________

    for (let i = 0; i < events.length; i++) {
      titles['ev' + (i + 1)] = events[i].evTitle; //adding event titles
    }
    // console.log ( "tree table titles", titles);


    for (let i = 0; i < events.length; i++) {
      occurences['ev' + (i + 1)] = events[i].evOccurence;
    }
    //  console.log("occurences data:",occurences);

    for (let i = 0; i < events.length; i++) {
      stretches['ev' + (i + 1)] = events[i].evStretch;
    }
    // console.log("stretches data:",stretches);

    // events loops____________________________________________________________________________

    for (let ie = 0; ie < events.length; ie++) {

      // event maintenance

      for (let i = 0; i < events[ie].eventMaintenance.length; i++) {
        evMaintenancesI['ev' + (i + 1)] = events[ie].eventMaintenance[i].evMaintenance;
      }
      console.log("event maintenance item:",evMaintenancesI);


      for (let i = 0; i < events[ie].eventMaintenance.length; i++) {
        evMaintenancesC['ev' + (i + 1)] = events[ie].eventMaintenance[i].evCost;
      }
      // console.log("event maintenance", evMaintenancesI);

      // event labors

      for (let i = 0; i < events[ie].eventLabours.length; i++) {
        evLaborsL['ev' + (i + 1)] = events[ie].eventLabours[i].evLabour;
      }

      for (let i = 0; i < events[ie].eventLabours.length; i++) {
        evLaborsH['ev' + (i + 1)] = events[ie].eventLabours[i].evHour;
      }

      //event contractors


      for (let i = 0; i < events[ie].eventContractors.length; i++) {
        evContractorsL['ev' + (i + 1)] = events[ie].eventContractors[i].evContractor;
      }

      for (let i = 0; i < events[ie].eventContractors.length; i++) {
        evContractorsH['ev' + (i + 1)] = events[ie].eventContractors[i].evCost;
      }
    }
    //_____________________________________________________________________________________

    // console.log("event maintenances:",evMaintenancesI, evMaintenancesC);



    // overhaul loops______________________________________________________________________

    // overhaul maintenances


    for (let i = 0; i < overhaul.overhaulMaintenance.length; i++) {
      evMaintenancesI['oh'] =
        overhaul.overhaulMaintenance[i].ohMaintenance;
    }

    for (let i = 0; i < overhaul.overhaulMaintenance.length; i++) {
      evMaintenancesC['oh'] = overhaul.overhaulMaintenance[i].ohCost;
    }

    // overhaul labors

    for (let i = 0; i < overhaul.overhaulLabours.length; i++) {
      evLaborsL['oh'] = overhaul.overhaulLabours[i].ohLabour;
    }

    for (let i = 0; i < overhaul.overhaulLabours.length; i++) {
      evLaborsH['oh'] = overhaul.overhaulLabours[i].ohHour;
    }

    // overhaul contractors

    for (let i = 0; i < overhaul.overhaulContractors.length; i++) {
      evContractorsL['oh'] = overhaul.overhaulContractors[i].ohLabour;
    }

    for (let i = 0; i < overhaul.overhaulContractors.length; i++) {
      evContractorsH['oh'] = overhaul.overhaulContractors[i].ohHour;
    }

    //_________________________________________________________________________________

    var data: TreeNode[] = [
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
        children: [
          {
            data: evMaintenancesI,
          },
          {
            data: evMaintenancesC,
          },
        ],
      },
      {
        data: {
          desc: 'Labor',
        },
        children: [
          {
            data: evLaborsL,
          },
          {
            data: evLaborsH,
          },
        ],
      },
      {
        data: {
          desc: 'Contractor',
        },
        children: [
          {
            data: evContractorsL,
          },
          {
            data: evContractorsH,
          },
        ],
      },

    ];

    return data;
  }
}

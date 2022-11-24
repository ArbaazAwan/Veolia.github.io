import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsoleLogger } from '@aws-amplify/core';
import { TreeNode } from 'primeng/api';
@Injectable({
  providedIn: 'any',
})
export class NodeService {
  constructor(private http: HttpClient) { }
  data!: TreeNode[];

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


    // console.log("event maintenances:",evMaintenancesI, evMaintenancesC);



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
        children: []
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

    var mIObject:any = {
      desc:"Item"
    }
    var mCObject:any = {
      desc: "Cost"
    }
    var lObject:any = {}
    var lHCObject:any
    var cObject:any
    var cHObject:any
    var eventMaintenance : any = [];

    for (let index = 0; index < events.length; index++) {
      eventMaintenance.push(events[index].eventMaintenance)
    }

    // console.log(eventMaintenance);
    for (let mainIndex = 0;  mainIndex < eventMaintenance.length; mainIndex++) {

      for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        mIObject['ev' + (eventIndex + 1)] = events[eventIndex].eventMaintenance[mainIndex]?.evMaintenance
        mCObject["ev" + (eventIndex + 1)] = events[eventIndex].eventMaintenance[mainIndex]?.evCost
      }

    }

    // overhaul loops______________________________________________________________________

    // overhaul maintenances




    for (let i = 0; i < overhaul.overhaulMaintenance.length; i++) {

      mIObject["oh"] = overhaul.overhaulMaintenance[i].ohMaintenance
      mCObject["oh"] = overhaul.overhaulMaintenance[i].ohCost
      this.data[3].children?.push({ data : mIObject });
      this.data[3].children?.push({ data : mCObject });
    }

    // overhaul labors


    for (let i = 0; i < overhaul.overhaulLabours.length; i++) {
      // evLaborsL['oh'] = overhaul.overhaulLabours[i].ohLabour;
      lObject = {
          oh : overhaul.overhaulLabours[i].ohLabour
      }
      this.data[4].children?.push({data:lObject});

      lHCObject = {
          oh: overhaul.overhaulLabours[i].ohHour
      }
      this.data[4].children?.push({data:lHCObject});
    }

    // overhaul contractors


    for (let i = 0; i < overhaul.overhaulContractors.length; i++) {
      cObject = {
          oh: overhaul.overhaulContractors[i].ohLabour
      }
      this.data[5].children?.push({data:cObject});

      cHObject = {
          oh : overhaul.overhaulContractors[i].ohHour
      }
      this.data[5].children?.push({data:cHObject});

    }



    //_________________________________________________________________________________

        // events loops____________________________________________________________________________

        // for (let ie = 0; ie < events.length; ie++) {

        //   // event maintenance

        //   for (let i = 0; i < events[ie].eventMaintenance.length; i++) {
        //     mIObject['ev' + (ie + 1)] = events[ie].eventMaintenance[i].evMaintenance
        //     mCObject['ev' + (ie + 1)] = events[ie].eventMaintenance[i].evCost
        //   }
        //   this.data[3].children?.push({data : mIObject});
        //   this.data[3].children?.push({data: mCObject});

        //   // event labors

        //   for (let i = 0; i < events[ie].eventLabours.length; i++) {
        //     evLaborsL['ev' + (ie + 1)] = events[ie].eventLabours[i].evLabour;
        //     evLaborsH['ev' + (ie + 1)] = events[ie].eventLabours[i].evHour;
        //   }
        //   this.data[4].children?.push({data:evLaborsL});
        //   this.data[4].children?.push({data:evLaborsH});

        //   //event contractors

        //   for (let i = 0; i < events[ie].eventContractors.length; i++) {
        //     evContractorsL['ev' + (i + 1)] = events[ie].eventContractors[i].evContractor;
        //     evContractorsH['ev' + (i + 1)] = events[ie].eventContractors[i].evCost;
        //   }
        //   this.data[5].children?.push({data:evContractorsL});
        //   this.data[5].children?.push({data:evContractorsH});
        // }
        //_____________________________________________________________________________________

    return this.data;
  }
}

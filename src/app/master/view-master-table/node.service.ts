import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    // overhaul loops______________________________________________________________________

    // overhaul maintenances

    var mIObject:any
    var mCObject:any
    var lObject:any
    var lHCObject:any
    var cObject:any
    var cHObject:any
    for (let i = 0; i < overhaul.overhaulMaintenance.length; i++) {

      mIObject = {
        desc: "Item",
        oh: overhaul.overhaulMaintenance[i].ohMaintenance
      }
      //pushing first field
      this.data[3].children?.push({data:mIObject});

      mCObject = {
        desc: "Cost",
        oh: overhaul.overhaulMaintenance[i].ohCost
      }
      //pushing second field
      this.data[3].children?.push({data: mCObject});
    }

    // overhaul labors


    for (let i = 0; i < overhaul.overhaulLabours.length; i++) {
      // evLaborsL['oh'] = overhaul.overhaulLabours[i].ohLabour;
      lObject = {
        desc: "Level",
        oh : overhaul.overhaulLabours[i].ohLabour
      }
      this.data[4].children?.push({data:lObject});

      lHCObject = {
        desc:"Hours",
        oh: overhaul.overhaulLabours[i].ohHour
      }
      this.data[4].children?.push({data:lHCObject});
    }

    // overhaul contractors


    for (let i = 0; i < overhaul.overhaulContractors.length; i++) {
      cObject = {
        desc:"Labor",
        oh: overhaul.overhaulContractors[i].ohLabour
      }
      this.data[5].children?.push({data:cObject});

      cHObject = {
          desc: "Hours",
          oh : overhaul.overhaulContractors[i].ohHour
      }
      this.data[5].children?.push({data:cHObject});

    }

    //_________________________________________________________________________________

        // events loops____________________________________________________________________________

        for (let ie = 0; ie < events.length; ie++) {

          // event maintenance
          let evMI:any ={};
          let evMC:any ={};

          for (let i = 0; i < events[ie].eventMaintenance.length; i++) {
            evMI['ev' + (ie + 1)] = events[ie].eventMaintenance[i].evMaintenance;

            if(this.data[3].children?.at(i)?.data){
              // console.log("childern data:",this.data[3].children?.at(i)?.data );
              Object.assign(this.data[3].children?.at(i)?.data,evMI);
            }
            else{
              this.data[3].children?.push(evMI);
            }

            evMC['ev' + (ie + 1)] = events[ie].eventMaintenance[i].evCost;

            if(this.data[3].children?.at(i)?.data){
              Object.assign(this.data[3].children?.at(i)?.data,evMC);
            }
            else{
              this.data[3].children?.push(evMC);
            }

          }

          // event labors
          let evL:any = {};
          let evLH:any = {};

          for (let i = 0; i < events[ie].eventLabours.length; i++) {

            evL['ev' + (ie + 1)] = events[ie].eventLabours[i].evLabour;
            if(this.data[4].children?.at(i)?.data){
              Object.assign(this.data[4].children?.at(i)?.data,evL);
            }
            else{
              this.data[4].children?.push(evL);
            }

            evLH['ev' + (ie + 1)] = events[ie].eventLabours[i].evHour;
            if(this.data[4].children?.at(i)?.data){
              Object.assign(this.data[4].children?.at(i)?.data,evLH);
            }
            else{
              this.data[4].children?.push(evLH);
            }
          }

          // event contractors

          let evCL:any = {};
          let evCC:any = {};

          for (let i = 0; i < events[ie].eventContractors.length; i++) {
            evCL['ev' + (ie + 1)] = events[ie].eventContractors[i].evContractor;
            if(this.data[5].children?.at(i)?.data){
              Object.assign(this.data[5].children?.at(i)?.data,evCL);
            }
            else{
              this.data[5].children?.push(evCL);
            }

            evCC['ev' + (ie + 1)] = events[ie].eventContractors[i].evCost;
            if(this.data[5].children?.at(i)?.data){
              Object.assign(this.data[5].children?.at(i)?.data,evCC);
            }
            else{
              this.data[5].children?.push(evCC);
            }
          }
        }
        //_____________________________________________________________________________________

        console.log("this is data:",this.data);
    return this.data;
  }
}

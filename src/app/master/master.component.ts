import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  form!:FormGroup
  showSideNav:boolean = true;
  assets!:any[];

  constructor(private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.loadAssets();
    this.form = this.fb.group({
      id:'',
      assetName:'',
      appDesc: '',
      unitMeas:'',
      rev:'',
      unitCode:'',
      appCode:'',
      replCost:'',
      lifeMOs:'',
      OHLife:'',
      event:'',
      maintenances:this.fb.array([]),
      labors:this.fb.array([]),
      costs:this.fb.array([])
    });

  }

  loadAssets(){
    this.assets = [
      {
        id:'1',
        assetName:'asset1',
        appDesc:'appdesc 1',
        unitMeas:'unit meas1',
        rev:'rev1',
        unitCode:'1',
        appCode:'1',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event1:{
          title:'event1',
          Every:'every1',
          Strch:'strch1',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
        event2:{
          title:'event2',
          Every:'every2',
          Strch:'strch2',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'2',
        assetName:'asset2',
        appDesc:'appdesc 2',
        unitMeas:'unit meas2',
        rev:'rev2',
        unitCode:'2',
        appCode:'2',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event1:{
          title:'event1',
          Every:'every1',
          Strch:'strch1',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
        event2:{
          title:'event2',
          Every:'every2',
          Strch:'strch2',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'3',
        assetName:'asset3',
        appDesc:'appdesc 3',
        unitMeas:'unit meas3',
        rev:'rev3',
        unitCode:'3',
        appCode:'3',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event5:{
          title:'event5',
          Every:'every5',
          Strch:'strch5',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'4',
        assetName:'asset4',
        appDesc:'appdesc 4',
        unitMeas:'unit meas4',
        rev:'rev4',
        unitCode:'4',
        appCode:'4',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event1:{
          title:'event1',
          Every:'every1',
          Strch:'strch1',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'5',
        assetName:'asset5',
        appDesc:'appdesc 5',
        unitMeas:'unit meas5',
        rev:'rev5',
        unitCode:'5',
        appCode:'5',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event1:{
          title:'event1',
          Every:'every1',
          Strch:'strch1',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'6',
        assetName:'asset6',
        appDesc:'appdesc 6',
        unitMeas:'unit meas6',
        rev:'rev6',
        unitCode:'6',
        appCode:'6',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event8:{
          title:'event8',
          Every:'every8',
          Strch:'strch8',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
      {
        id:'7',
        assetName:'asset7',
        appDesc:'appdesc 7',
        unitMeas:'unit meas7',
        rev:'rev7',
        unitCode:'7',
        appCode:'7',
        replCost:'123',
        lifeMOs:'12',
        OHLife:'80',
        event6:{
          title:'event6',
          Every:'every6',
          Strch:'strch6',
          maintenance1:{
            desc:'M1',
            cost:'123'
          },
          maintenance2:{
            desc:'M2',
            cost:'234'
          },
          maintenance3:{
            desc:'M3',
            cost:'345'
          },
          maintenance4:{
            desc:'M4',
            cost:'456'
          },
          maintenance5:{
            desc:'M5',
            cost:'567'
          },
          labor1:{
            level:'skilled',
            hours:'2'
          },
          labor2:{
            level:'unskilled',
            hours:'1'
          },
          labor3:{
            level:'skilled',
            hours:'3'
          },
          labor4:{
            level:'unskilled',
            hours:'2'
          },
          cost1:{
            desc:'cost1',
            amount:'123'
          },
          cost2:{
            desc:'cost2',
            amount:'234'
          },
          cost3:{
            desc:'cost3',
            amount:'345'
          }
        },
      },
    ]
  }

  maintenances():FormArray
  {
    return <FormArray>this.form.get("maintenances")
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }

  costs() : FormArray
  {
    return this.form.get("costs") as FormArray
  }

  newMaintenance()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }

  newLabor(): FormGroup
  {
    return this.fb.group({
      level: '',
      hrs: '',
    })
  }

  newCost()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }

  addMaintenance()
  {
    this.maintenances().push(this.newMaintenance());
  }

  addLabor()
  {
    this.labors().push(this.newLabor());
  }

  addCost()
  {
    this.costs().push(this.newCost());
  }

  removeMaintenance(index:number)
  {
    this.maintenances().removeAt(index);
  }

  removeLabor(i:number)
  {
    this.labors().removeAt(i);
  }

  removeCost(i:number)
  {
    this.costs().removeAt(i);
  }

  toggleShowSideNav(){
    this.showSideNav = !this.showSideNav;
  }

  viewAsset(asset:any){
    this.toggleShowSideNav();
  }

  editAsset(asset:any){
    this.toggleShowSideNav();
    this.form = asset;
  }

  onSubmit(){

  }

}

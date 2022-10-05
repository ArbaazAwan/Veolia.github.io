import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from './master.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  form!:FormGroup
  showSideNav:boolean = true;
  assets!:any[];

  constructor(private fb:FormBuilder,private masterService:MasterService) {

  }

  ngOnInit(): void {
   this.assets = this.masterService.loadAssets(); //loading the assets

    this.form = this.fb.group({ //building form
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
      event1:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event2:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event3:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event4:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event5:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event6:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event7:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event8:this.fb.group({
        title:'',
        Every:'',
        Strch:'',
        maintenance1:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance2:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance3:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance4:this.fb.group({
          desc:'',
          cost:''
        }),
        maintenance5:this.fb.group({
          desc:'',
          cost:''
        }),
        labor1:this.fb.group({
          level:'',
          hours:''
        }),
        labor2:this.fb.group({
          level:'',
          hours:''
        }),
        labor3:this.fb.group({
          level:'',
          hours:''
        }),
        labor4:this.fb.group({
          level:'',
          hours:''
        }),
        cost1: this.fb.group({
          desc:'',
          amount:''
        }),
        cost2: this.fb.group({
          desc:'',
          amount:''
        }),
        cost3: this.fb.group({
          desc:'',
          amount:''
        }),
      }),
      event:'',
      maintenances:this.fb.array([]),
      labors:this.fb.array([]),
      conts:this.fb.array([])
    });

  }

  maintenances():FormArray
  {
    return <FormArray>this.form.get("maintenances")
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }

  conts() : FormArray
  {
    return this.form.get("conts") as FormArray
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

  newCont()
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

  addCont()
  {
    this.conts().push(this.newCont());
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
    this.conts().removeAt(i);
  }

  toggleShowSideNav(){
    this.showSideNav = !this.showSideNav;
  }
  viewAsset(asset:any){
    this.toggleShowSideNav();
    this.masterService.setAsset(asset);
  }

  editAsset(asset:any){
    this.toggleShowSideNav();
  }

  onSubmit(){
    this.masterService.assets.push(this.form.value);
  }

}

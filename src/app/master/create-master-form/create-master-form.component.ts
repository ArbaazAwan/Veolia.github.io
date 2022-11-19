import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss']
})
export class CreateMasterFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private masterService:MasterService) { }

  @Input() editMasterId:any;
  form!: FormGroup;
  siteId: any = localStorage.getItem('siteId');
  isLoading:boolean = false;

  ngOnInit(): void {

    this.initializeForm();

  }

  initializeForm() {
    if(this.editMasterId!=null && this.editMasterId != ''){
      this.editForm(this.editMasterId);
      this.editMasterId = null; //reset the id
    }
    else{
      this.createForm();
    }
  }

  createForm(){
    this.form = this.fb.group({
      oldAssetType: ['', Validators.required],
      masterStyle: ['', Validators.required],
      newAssetType: ['', Validators.required],
      masterSize: ['', Validators.required],
      oldDescription: ['', Validators.required],
      newDescription: ['', Validators.required],
      unitMeasurement: ['', Validators.required],
      rev: ['', Validators.required],
      replacementCost: ['', Validators.required],
      lifeMonths: ['', Validators.required],
      overhaulLife: ['', Validators.required],
      ovTitle: ['', Validators.required],
      ovStretch: ['', Validators.required],
      events: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulContractors: this.fb.array([]),
    });
  }

  editForm(masterId:any){
    this.isLoading = true;
    this.masterService.getCompleteMaster(masterId).subscribe(
      (el:any)=>{
        
        const [_masterComplete] = el;
        const [_master] = _masterComplete.master;

        this.form = this.fb.group({
          oldAssetType: [_master.oldAssetType, Validators.required],
          masterStyle: [_master.masterStyle, Validators.required],
          newAssetType: [_master.newAssetType, Validators.required],
          masterSize: [_master.masterSize, Validators.required],
          oldDescription: [_master.oldDescription, Validators.required],
          newDescription: [_master.newDescription, Validators.required],
          unitMeasurement: [_master.unitMeasurement, Validators.required],
          rev: [_master.rev, Validators.required],
          replacementCost: [_master.replacementCost, Validators.required],
          lifeMonths: [_master.lifeMonths, Validators.required],
          overhaulLife: [_master.overhaulLife, Validators.required],
          ovTitle: [_masterComplete.overHaul.ovTitle, Validators.required],
          ovStretch: [_masterComplete.overHaul.ovStretch, Validators.required],
          events: this.fb.array([]).setValue(_masterComplete.events),
          overhaulMaintenances: this.fb.array([]).setValue(_masterComplete.overHaul.overhaulMaintenances),
          overhaulLabors: this.fb.array([]).setValue(_masterComplete.overHaul.overhaulLabours),
          overhaulContractors: this.fb.array([]).setValue(_masterComplete.overHaul.overhaulContractors),
        });

        this.isLoading = false;
      }
    )
  }

  resetForm(){
    this.form.reset();
  }


  onSubmit() {
    this.postformMaster();
    this.resetForm();
  }

  postformMaster() {
    let f = this.form.value;

    const master = {
      "siteId": this.siteId,
      "oldAssetType": f.oldAssetType,
      "masterStyle": f.masterStyle,
      "newAssetType": f.newAssetType,
      "masterSize": f.masterSize,
      "oldDescription": f.oldDescription,
      "newDescription": f.newDescription,
      "unitMeasurement": f.unitMeasurement,
      "rev": f.rev,
      "replacementCost": f.replacementCost,
      "lifeMonths": f.lifeMonths,
      "overhaulLife": f.overhaulLife
    };

    let completeMaster = {

      master: master,
      overHaul: {
        ovTitle: f.ovTitle,
        ovStretch: f.ovStretch,
        overhaulMaintenances: f.overhaulMaintenances, //maintenance array
        overhaulLabours: f.overhaulLabours,             //labors array
        OverhaulContractors: f.overhaulContractors   //contractors array
      },
      events: f.events, //events array

    }

    this.masterService.postCompleteMaster(completeMaster).subscribe(
      (res:any)=>{
        console.log(res);
      }
    );

  }


  events(): FormArray {
    return <FormArray>this.form.get('events');
  }

  maintenances(index:any): FormArray {
    return <FormArray>this.events()
    .at(index)
    .get('eventMaintenance');
  }

  overhaulMaintenances(): FormArray {
    return this.form.get('overhaulMaintenances') as FormArray;
  }

  labors(index:any): FormArray {
    return this.events()
    .at(index)
    .get('eventLabours') as FormArray;
  }

  overhaulLabors(): FormArray {
    return this.form.get('overhaulLabors') as FormArray;
  }

  conts(index:any): FormArray {
    return this.events()
    .at(index)
    .get('eventContractors') as FormArray;
  }

  overhaulConts(): FormArray {
    return this.form.get('overhaulContractors') as FormArray;
  }

  newEvent() {
    return this.fb.group({
      eventTitle: '',
      eventOccurence:'',
      eventStretch: '',
      eventMaintenance:this.fb.array([]),
      eventLabours:this.fb.array([]),
      eventContractors: this.fb.array([])
    });
  }

  newMaintenance() {
    return this.fb.group({
      evMaintenance: '',
      evCost: '',
    });
  }

  newOverhaulMaintenance() {
    return this.fb.group({
      ohMaintenance: '',
      ohCost: '',
    });
  }

  newLabor(): FormGroup {
    return this.fb.group({
      evLabour: '',
      evHour: '',
    });
  }

  newOverhaulLabor(): FormGroup {
    return this.fb.group({
      ohLabour: '',
      ohHour: '',
    });
  }

  newCont() {
    return this.fb.group({
      evContractor: '',
      evCost: '',
    });
  }

  newOverhaulCont() {
    return this.fb.group({
      ohLabour:"",
      ohHour: ''
    });
  }

  addEvent() {
    this.events().push(this.newEvent());
  }

  addMaintenance(index:any) {
    this.maintenances(index).push(this.newMaintenance());
  }

  addOverhaulMaintenance() {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance());
  }

  addLabor(index:any) {
    this.labors(index).push(this.newLabor());
  }

  addOverhaulLabor() {
    this.overhaulLabors().push(this.newOverhaulLabor());
  }

  addCont(index:any) {
    this.conts(index).push(this.newCont());
  }

  addOverhaulCont() {
    this.overhaulConts().push(this.newOverhaulCont());
  }

  removeEvent(index: number) {
    this.events().removeAt(index);
  }

  removeMaintenance(index: number) {
    this.maintenances(index).removeAt(index);
  }

  removeOverhaulMaintenance(index: number) {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(i: number) {
    this.labors(i).removeAt(i);
  }

  removeOverhaulLabor(i: number) {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(i: number) {
    this.conts(i).removeAt(i);
  }

  removeOverhaulCont(i: number) {
    this.overhaulConts().removeAt(i);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from 'src/app/master/master.service';
import { SummaryService } from '../../summary.service';

@Component({
  selector: 'app-summary-master',
  templateUrl: './summary-master.component.html',
  styleUrls: ['./summary-master.component.scss']
})
export class SummaryMasterComponent implements OnInit {

  @Input() summaryId: any;
  @Input() masterId: any;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  isLoading: boolean = false;
  form: FormGroup = this.initialForm();
  tabIndex: number = 0;
  editMasterId: any;
  isEditForm: boolean = false;
  userName: any;
  siteId: any;

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private fb: FormBuilder,
    private masterService: MasterService,
    private summaryService: SummaryService,
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name');
    this.siteId = localStorage.getItem('siteId');
    this.populateEditMasterForm(this.masterId);
  }

  initialForm() {
    return (this.form = this.fb.group({
      masterId: [{ value: '', disabled: true }],
      oldAssetType: [''],
      masterStyle: [''],
      newAssetType: [''],
      masterSize: [''],
      oldDescription: [''],
      newDescription: [''],
      dutyApplication: [''],
      quality: [''],
      unitMeasurement: [''],
      rev: [''],
      replacementCost: [''],
      lifeMonths: [''],
      overhaulLife: [''],
      editedBy: [''],
      createdBy: [''],
      ovTitle: [''],
      ovStretch: [''],
      unitDesc: [''],
      events: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulContractors: this.fb.array([]),
    }));
  }

  resetForm() {
    this.form.reset();
    this.form = this.initialForm();
    this.addEvent();
    this.tabIndex = 0;
    this.editMasterId = null;
  }


  populateEditMasterForm(masterId: any) {
    this.isEditForm = true;
    this.editMasterId = masterId;
    this.isLoading = true;
    this.masterService.getCompleteMasterById(masterId).subscribe((el: any) => {
      const _masterComplete = el;

      const _master = _masterComplete.master;

      const _overhaul = _masterComplete.overhaul;

      let c = this.initialForm().controls;
      c.masterId.setValue(_master.masterId);
      c.oldAssetType.setValue(_master.oldAssetType ? _master.oldAssetType : '');
      c.masterStyle.setValue(_master.masterStyle ? _master.masterStyle : '');
      c.newAssetType.setValue(_master.newAssetType ? _master.newAssetType : '');
      c.masterSize.setValue(_master.masterSize ? _master.masterSize : '');
      c.oldDescription.setValue(
        _master.oldDescription ? _master.oldDescription : ''
      );
      c.newDescription.setValue(
        _master.newDescription ? _master.newDescription : ''
      );
      c.dutyApplication.setValue(
        _master.dutyApplication ? _master.dutyApplication : ''
      );
      c.quality.setValue(_master.quality ? _master.quality : '');
      c.unitMeasurement.setValue(
        _master.unitMeasurement ? _master.unitMeasurement : ''
      );
      c.rev.setValue(_master.rev ? _master.rev : '');
      c.replacementCost.setValue(
        _master.replacementCost ? _master.replacementCost : ''
      );
      c.unitDesc.setValue(_master.unitDesc ? _master.unitDesc : '');
      c.lifeMonths.setValue(_master.lifeMonths ? _master.lifeMonths : '');
      c.overhaulLife.setValue(_master.overhaulLife ? _master.overhaulLife : '');
      c.ovTitle.setValue(
        _overhaul ? (_overhaul.ovTitle ? _overhaul.ovTitle : '') : ''
      );
      c.ovStretch.setValue(
        _overhaul ? (_overhaul.ovStretch ? _overhaul.ovStretch : '') : ''
      );
      c.createdBy.setValue(_master.createdBy);

      const _events = _masterComplete.events;

      if (_events) {
        _events.forEach((event: any) => {
          this.addEvent(event);
        });
        //focus on first tab
        this.tabIndex = 0;
      }

      if (_overhaul) {
        if (_overhaul.overhaulMaintenance) {
          _overhaul.overhaulMaintenance.forEach((ovM: any) => {
            this.addOverhaulMaintenance(ovM);
          });
        }
        if (_overhaul.overhaulLabours) {
          _overhaul.overhaulLabours.forEach((ovL: any) => {
            this.addOverhaulLabor(ovL);
          });
        }
        if (_overhaul.overhaulContractors) {
          _overhaul.overhaulContractors.forEach((ovC: any) => {
            this.addOverhaulCont(ovC);
          });
        }
      }

      this.isLoading = false;
    });

  }


  postformMaster() {
    this.isLoading = true;
    let f = this.form.getRawValue();

    let formattedDate = new Date().toString().split(' ').slice(0, 4).join(' ');

    const master: any = {
      siteId: this.siteId,
      oldAssetType: f.oldAssetType,
      masterStyle: f.masterStyle,
      newAssetType: f.newAssetType,
      masterSize: f.masterSize,
      oldDescription: f.oldDescription,
      newDescription: f.newDescription,
      dutyApplication: f.dutyApplication,
      quality: f.quality,
      unitMeasurement: f.unitMeasurement,
      rev: f.rev,
      replacementCost: f.replacementCost,
      lifeMonths: f.lifeMonths,
      overhaulLife: f.overhaulLife,
      unitDesc: f.oldAssetType + " - " + f.newAssetType
        + ", " + f.masterStyle + ", " + f.masterSize
        + ", " + f.dutyApplication + ", " + f.quality,
      masterStatus: true,
      createdBy: f.createdBy ? f.createdBy : this.userName,
      editedBy: this.isEditForm ? this.userName : null,
      endDate: formattedDate,
    };

    let completeMaster = {
      master: master,
      overhaul: {
        ovTitle: f.ovTitle,
        ovStretch: f.ovStretch,
        overhaulMaintenance: f.overhaulMaintenances, //maintenance array
        overhaulLabours: f.overhaulLabors, //labors array
        overhaulContractors: f.overhaulContractors, //contractors array
      },
      events: f.events, //events array
    };

    this.masterService
      .postCompleteMaster(completeMaster).subscribe((res: any) => {

        let newMasterId = res.message;
        this.summaryService.updateMasterIdByMasterId(newMasterId, this.summaryId).subscribe({
          next: () => {
            this.summaryService.openSnackBar(`New Master created and summary's masterId has been updated!`, 'Close');
            this.activeModal.dismiss('Cross click');
            this.isLoading = false;
            this.formSubmit.emit();
          },
          error: () => {
            this.summaryService.openSnackBar(`Failed to update summary's masterId`, 'Close');
            this.isLoading = false;
          }
        });
      });

  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  onSubmit() {
    let formattedDate = new Date().toString().split(' ').slice(0, 4).join(' ');
    this.form.get('rev')?.setValue(formattedDate);

    if (this.form.valid) {
      this.postformMaster();

    } else {
      this.validateAllFormFields(this.form);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup)
        this.validateAllFormFields(control);
    });
  }


  events(): FormArray {
    return this.form.get('events') as FormArray;
  }

  maintenances(index: any): FormArray {
    return <FormArray>this.events().at(index).get('eventMaintenance');
  }

  overhaulMaintenances(): FormArray {
    return this.form.get('overhaulMaintenances') as FormArray;
  }

  labors(index: any): FormArray {
    return this.events().at(index).get('eventLabours') as FormArray;
  }

  overhaulLabors(): FormArray {
    return this.form.get('overhaulLabors') as FormArray;
  }

  conts(index: any): FormArray {
    return this.events().at(index).get('eventContractors') as FormArray;
  }

  overhaulConts(): FormArray {
    return this.form.get('overhaulContractors') as FormArray;
  }

  newEvent(event?: any) {
    return this.fb.group({
      evTitle: [event ? event.evTitle : ''],
      evOccurence: [event ? event.evOccurence : ''],
      evStretch: [event ? event.evStretch : ''],
      eventMaintenance: this.fb.array([]),
      eventLabours: this.fb.array([]),
      eventContractors: this.fb.array([]),
    });
  }

  newMaintenance(maintenance?: any) {
    return this.fb.group({
      evMaintenance: maintenance ? maintenance.evMaintenance : '',
      evCost: maintenance ? maintenance.evCost : '',
    });
  }

  newOverhaulMaintenance(ovM?: any) {
    return this.fb.group({
      ohMaintenance: ovM ? ovM.ohMaintenance : '',
      ohCost: ovM ? ovM.ohCost : '',
    });
  }

  newLabor(evLabour?: any): FormGroup {
    return this.fb.group({
      evLabour: evLabour ? evLabour.evLabour : '',
      evHour: evLabour ? evLabour.evHour : '',
    });
  }

  newOverhaulLabor(ovL?: any): FormGroup {
    return this.fb.group({
      ohLabour: ovL ? ovL.ohLabour : '',
      ohHour: ovL ? ovL.ohHour : '',
    });
  }

  newCont(evContractor?: any) {
    return this.fb.group({
      evContractor: evContractor ? evContractor.evContractor : '',
      evCost: evContractor ? evContractor.evCost : '',
    });
  }

  newOverhaulCont(ovC?: any) {
    return this.fb.group({
      ohLabour: ovC ? ovC.ohLabour : '',
      ohHour: ovC ? ovC.ohHour : '',
    });
  }

  addEvent(event?: any) {
    this.events().push(this.newEvent(event));
    let eventIndex = (<FormArray>this.form.get('events')).length - 1;

    this.tabIndex = this.events().length;

    if (this.isEditForm) {

      // this.tabIndex++;

      if (event) {
        if (!!event.eventMaintenance) {
          event.eventMaintenance.forEach((evMaintenance: any) => {
            this.addMaintenance(eventIndex, evMaintenance);
          });
        }
        if (event.eventLabours) {
          event.eventLabours.forEach((evLabour: any) => {
            this.addLabor(eventIndex, evLabour);
          });
        }
        if (event.eventContractors) {
          event.eventContractors.forEach((evContractor: any) => {
            this.addCont(eventIndex, evContractor);
          });
        }
      }
    }
  }

  addMaintenance(index: any, maintenance?: any) {
    this.maintenances(index).push(this.newMaintenance(maintenance));
  }

  addOverhaulMaintenance(ovM?: any) {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance(ovM));
  }

  addLabor(index: any, evLabour?: any) {
    this.labors(index).push(this.newLabor(evLabour));
  }

  addOverhaulLabor(ovL?: any) {
    this.overhaulLabors().push(this.newOverhaulLabor(ovL));
  }

  addCont(index: any, evContractor?: any) {
    this.conts(index).push(this.newCont(evContractor));
  }

  addOverhaulCont(ovC?: any) {
    this.overhaulConts().push(this.newOverhaulCont(ovC));
  }

  removeEvent(index: number) {
    this.events().removeAt(index);
    this.tabIndex = this.events().length;

    // if (this.isEditForm) {
    //   this.tabIndex++;
    // }
  }

  removeMaintenance(eventIndex: any, index: number) {
    this.maintenances(eventIndex).removeAt(index);
  }

  removeOverhaulMaintenance(index: number) {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(eventIndex: any, i: number) {
    this.labors(eventIndex).removeAt(i);
  }

  removeOverhaulLabor(i: number) {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(eventIndex: any, i: number) {
    this.conts(eventIndex).removeAt(i);
  }

  removeOverhaulCont(i: number) {
    this.overhaulConts().removeAt(i);
  }

}
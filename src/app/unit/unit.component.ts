import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { ProcessModalComponent } from '../process-modal/process-modal.component';
import { UnitService } from './unit.service';
import { TableUtil } from './unitServices/tableUtil';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  })
export class UnitComponent implements OnInit {

  searchText = '';
  title = 'autocomplete';
  options !: string[];
  filteredOptions!: string[];
  formGroup!: any;
  sampleVariable:any;
  eventEvalTableShow:boolean = true;

  constructor(public modalService: NgbModal, private service : UnitService, private fb : FormBuilder){}

  ngOnInit(){
    this.initForm();
    this.getNames();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'asset' : ['']
    })
    this.formGroup.get('asset').valueChanges.subscribe((response: any) => {
      this.filterData(response);
    })
  }

  filterData(enteredData: string){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getNames(){
    this.service.getData().subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
}
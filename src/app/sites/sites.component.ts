import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor() { }
 
  sitesArray:any[]=[];
  @Input() title:string = 'Sites';

  ngOnInit(): void {
    
  }

  selectedsite: any ={
    id:null,
    name:''
  };
  sites!:any[];
  onsiteSelect(selectedsite:any){

  }
  

}

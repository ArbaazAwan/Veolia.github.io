import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  showSideNav:boolean = true;
  form!:FormGroup;
  clientsArray:any[]=[];

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName:['', Validators.required],
      clientCompanyName:['', Validators.required],
      clientAddress:['', Validators.required],
      clientEmail:['', Validators.required],
    })
  }

  selectedClient: any ={
    id:null,
    name:''
  };
  clients!:any[];
  onClientSelect(selectedClient:any){

  }
  resetForm(){
    this.form.reset();
  }

  toggleSideNavShow(){
    this.showSideNav = !this.showSideNav;
  }

  onSubmit(){
    this.clientsArray.push(this.form.value);

    this.toggleSideNavShow();
    this.resetForm();
  }


}

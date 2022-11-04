import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  form!:FormGroup;
  clientsArray:any[]=[];
  title:string = "Clients";
 
  ngOnInit(): void {
    this.form = this.fb.group({
      clientName:['', Validators.required],
      contractYears:['', Validators.required],
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


  onSubmit(){
    this.clientsArray.push(this.form.value);
    this.resetForm();
  }


}

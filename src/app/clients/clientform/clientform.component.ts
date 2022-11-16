import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.scss']
})
export class ClientformComponent implements OnInit {

  constructor(private fb:FormBuilder, private clientService:ClientService) { }
  form!:FormGroup;
  clientsArray:any[]=[];

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
    this.clientService.postClient(this.form.value)
    .subscribe(
      (res:any)=>{
        console.log(res);
      }
    );
    this.resetForm();
  }


}

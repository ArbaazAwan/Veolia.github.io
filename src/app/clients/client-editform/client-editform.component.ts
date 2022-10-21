import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-editform',
  templateUrl: './client-editform.component.html',
  styleUrls: ['./client-editform.component.scss']
})
export class ClientEditformComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  @Input() clientsArray!:any[];
  form!:FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName:['', Validators.required],
      clientCompanyName:['', Validators.required],
      clientAddress:['', Validators.required],
      clientEmail:['', Validators.required],
    })
  }

  resetForm(){
    this.form.reset();
  }


  onSubmit(){
    this.clientsArray.push(this.form.value);
    this.resetForm();
  }

}

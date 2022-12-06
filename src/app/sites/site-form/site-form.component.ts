import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private siteService: SiteService) {}

  form!: FormGroup;
  selectedClientId: number = 1;

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   siteName: [null, Validators.required],
    // });
  }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    // if (this.form.invalid) return alert('invalid form');
    // this.siteService
    //   .postSite(this.form.value.siteName, this.selectedClientId)
    //   .subscribe
    //   //validations here
    //   ();
    // this.resetForm();
  }
}

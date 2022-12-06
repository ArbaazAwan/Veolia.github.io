import { query } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  
  form!: FormGroup;
  isLoading: boolean = false;
  summaryData: any[] = [];
  error: any = {};
  isEditFormLoading: boolean = true;
  isMasterLoading: boolean = true;

  summarySelect = {
    assetTypes: [],
    sizes: [],
    discription: [],
    qualities: [],
  };

  constructor(
    private summaryService: SummaryService
  ) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.isLoading = true;
    this.summaryService.getSummary().subscribe((res: any) => {
      this.summaryData = res;
      this.isLoading = false;
    });
  }

}

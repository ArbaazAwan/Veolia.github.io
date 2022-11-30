import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SummaryService } from '../summary.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.scss'],
})
export class SummarytableComponent implements OnInit {

  selectedAssets: any[] = [];
  searchText: string = '';

  @Input() isLoading: boolean = false;
  summaryData: any[] = [];

  selection = new SelectionModel(true,[]);

  constructor(private summaryService:SummaryService) {}

  ngOnInit(): void {
    this.summaryService.getSummary().subscribe(
    (res:any)=>{
      this.summaryData = res;
    }
    )
  }



  deleteSummary(id: any) {
    this.summaryService.deleteSummary(id).subscribe(
      (res:any)=>{
        window.location.reload();
      }
    )
  }

  editSummary(id: any) {
    this.summaryService.setSummaryId(id);
  }
}


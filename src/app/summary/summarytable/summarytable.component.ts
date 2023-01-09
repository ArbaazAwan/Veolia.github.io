import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ClientService } from 'src/app/clients/client.service';
import { SiteService } from 'src/app/sites/site.service';
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

  @Output() summaryEmitter:any = new EventEmitter();
  @Input() isLoading: boolean = false;

  selectedAssets: any[] = [];
  searchText: string = '';
  siteId:any = localStorage.getItem("siteId");
  p: number = 1;
  siteStatus:boolean=false;
  clientId=localStorage.getItem('clientId');
  clientStatus:boolean=false;
  sortedSummary: any[] = [];
  summary: any[] = [];
  summaryData: any = [];

  selection = new SelectionModel(true,[]);

  constructor(private summaryService:SummaryService, private siteService:SiteService,  private clientService:ClientService) {}

  ngOnInit(): void {
    this.getSiteStatus();
    // this.getSummariesBySiteId(this.siteId);
    this.getClientStatus();

    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
      next:(summaries:any)=>{
        this.summaryData = summaries.summary;
        this.summaryEmitter.emit(this.summaryData);
        this.sortRecords({ active: 'summaryId', direction: 'desc'});
      },
      error:(err)=>{
        console.log("error occured in getSummary");
      }
    })

  }

  getSiteStatus(){
    this.siteService.getSiteById(this.siteId).subscribe({
      next:(site:any)=>{
        this.siteStatus = site[0].siteStatus;
      },
      error:(err)=>{
        console.log("error occured in getSiteStatus", err);
      }
    })
  }

  getClientStatus(){
    this.clientService.getClientById(this.clientId).subscribe({
      next:(client:any)=>{
        this.clientStatus = client[0].clientStatus;
      },
      error:(err)=>{
        console.log("error occured in getclientStatus", err);
      }
    })
  }

  sortRecords(sort: any) {
    const data = this.summaryData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedSummary = data.sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'summaryId':
          return this.compare(a.summaryId, b.summaryId, isAsc);
        case 'unit':
          return this.compare(a.unit, b.unit, isAsc);
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'assetType':
          return this.compare(a.assetType, b.assetType, isAsc);
        case 'summaryStyle':
          return this.compare(a.summaryStyle, b.summaryStyle, isAsc);
        case 'summarySize':
          return this.compare(a.summarySize, b.summarySize, isAsc);
        case 'dutyApplication':
          return this.compare(a.dutyApplication, b.dutyApplication, isAsc);
        case 'quality':
          return this.compare(a.quality, b.quality, isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'summaryload':
          return this.compare(a.summaryload, b.summaryload, isAsc);
        case 'life':
          return this.compare(a.life, b.life, isAsc);
        case 'installationtDate':
          return this.compare(a.installationtDate, b.installationtDate, isAsc);
        case 'createdDate':
          return this.compare(a.createdDate, b.createdDate, isAsc);
        case 'summaryStatus':
          return this.compare(a.summaryStatus, b.summaryStatus, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  getSummariesBySiteId(siteId:any){
    this.summaryService.getSummariesBySiteId(siteId).subscribe({
      next: (summaries)=>{
        this.summaryData = summaries;
      },
      error:(_)=>{
        console.log("error occured in getSummariesBySiteId");
      }
    }

    )
  }

  deleteSummary(id: any) {
    this.summaryService.deleteSummary(id).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:()=>{
        window.location.reload();
      }
    })
    }

  editSummary(id: any) {
    this.summaryService.setSummaryId(id);
  }
}


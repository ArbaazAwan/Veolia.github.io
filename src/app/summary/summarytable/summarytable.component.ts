import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.scss']
})
export class SummarytableComponent implements OnInit {

  constructor() { }

  @Input() summaryArray!:any[];
  showSideNav: boolean = true;
  allComplete: boolean = false;
  completed: boolean = false;

  ngOnInit(): void {
  }


  updateAllComplete() {
    this.allComplete = this.summaryArray != null && this.summaryArray.every(t => t.isChecked);
  }
  someComplete(): boolean {
    if (this.summaryArray == null) {
      return false;
    }
    return this.summaryArray.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.summaryArray == null) {
      return;
    }
    this.summaryArray.forEach(t => (t.completed = completed));
  }
  
  toggleShowSideNav() {
    this.showSideNav = !this.showSideNav;
  } 


}

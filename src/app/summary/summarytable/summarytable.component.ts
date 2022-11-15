import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  styleUrls: ['./summarytable.component.scss'],
})
export class SummarytableComponent implements OnInit {
  allComplete: boolean = false;
  completed: boolean = false;
  selectedAssets: any[] = [];
  searchText: string = '';

  @Input() summaryArray!: any[];
  @Input() isLoading: boolean = false;
  @Input() summaryData: any[] = [];
  @Output() deleteSummaryEvent = new EventEmitter();
  @Output() eidtSummaryEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  updateAllComplete() {
    this.allComplete =
      this.summaryArray != null && this.summaryArray.every((t) => t.isChecked);
  }
  someComplete(): boolean {
    if (this.summaryArray == null) {
      return false;
    }
    return (
      this.summaryArray.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.summaryArray == null) {
      return;
    }
    this.summaryArray.forEach((t) => (t.completed = completed));
  }

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.summaryArray.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.summaryArray.forEach((row) => this.selection.select(row));
  }

  deleteSummary(id: any) {
    console.log(id, 'deleteSummary');
    this.deleteSummaryEvent.emit(id);
  }

  editSummary(id: any) {
    this.eidtSummaryEvent.emit(id);
  }
}

function output() {
  throw new Error('Function not implemented.');
}

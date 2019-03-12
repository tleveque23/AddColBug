import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';


export interface Header {
  name: string;
  focus?: boolean;
  originalName?: string;
  new?: boolean;
}

export interface RowValue {
  value: string;
  focus?: boolean;
}

export interface Row {
  id?: number;
  data: RowValue[];
  valueForReorder?: string;
}

export interface GridData {
  headers: Header[];
  rows: Row[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public gridData: GridData;
  public selectedRows: Row[];
  public unsaved: boolean = false;
  public rowsPerPage: number = 10;
  public firstRow: number = 0;
  public displayColumnUsage: boolean;

  private currentEditedCol: number = -1;
  private toDeleteColNumber: number = -1;
  private currentEditedRow: number = -1;
  private currentEditedRowValue: RowValue;

  private baseGrid: GridData = {
    'headers': [
      {'name': 'Column A'},
      {'name': 'Column B'},
      {'name': 'Column C'},
      {'name': 'Column D'},
      {'name': 'Column E'},
      {'name': 'Column F'},
      {'name': 'Column G'},
    ],
    'rows': [
      {data: [
          {value: 'a'},
          {value: 'b'},
          {value: 'c'},
          {value: 'd'},
          {value: 'e'},
          {value: 'f'},
          {value: 'g'},
        ]}
    ]
  };


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  public ngOnInit(): void {
    this.gridData = this.baseGrid;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (event.code === 'KeyA' && event.altKey) { // Alt-a shortcut to add a new row
      // On Mac Alt-a will enter a special character in fields!
      if (navigator.appVersion.indexOf('Mac') !== -1) {
        event.preventDefault(); // Prevent browser event. Like entering the key in a focused field
      }
      this.addNewRow();
    }

    else if (event.code === 'KeyI' && event.altKey && !event.metaKey) { // Alt-i shortcut to add a new column
      event.preventDefault(); // Prevent browser event. Like entering the key in a focused field
      event.stopImmediatePropagation();
      event.stopPropagation();
      this.addNewColumn();
    }

    else if (this.currentEditedCol !== -1 ) {
      if (event.code === 'KeyD' && event.altKey && !event.metaKey) { // Alt-d shortcut to delete a column
        event.preventDefault(); // Prevent browser event. Like entering the key in a focused field
        event.stopImmediatePropagation();
        event.stopPropagation();
        if ( this.gridData.headers.length > 1 ) { // Don't delete if only one column remains!!
          this.toDeleteColNumber = this.currentEditedCol;
          this.deleteCurrentColumn();
        }
      }
    }
  }

  public addNewRow() {
    const newRow: Row = {
      id: this.gridData.rows.length,
      data: []
    };

    for (let i = 0; i < this.gridData.headers.length; i++) {
      newRow.data.push({value: ''});
    }

    newRow.data[0].focus = true;
    this.gridData.rows.push(newRow);

    // If we reach the limit per page, go to the next page
    if (this.gridData.rows.length > (this.firstRow + this.rowsPerPage)) {
      this.firstRow = this.firstRow + this.rowsPerPage;
      this.gridData.rows = [...this.gridData.rows]; // we need to to this to force PrimeNg to refresh the paginator component
    }
  }

  private addNewColumn() {
    const newColName = `Click to rename (${this.gridData.headers.length + 1})`;

    if ( this.currentEditedCol === -1 ) {
      this.gridData.headers.push({name: newColName, focus: true, new: true});
      for (const row of this.gridData.rows) {
        row.data.push({value: ''});
      }
    }
    else {
      // We need to insert the column just after the current one
      this.gridData.headers.splice(this.currentEditedCol + 1, 0, {name: newColName, focus: true, new: true});
      for (const row of this.gridData.rows) {
        row.data.splice(this.currentEditedCol + 1, 0, {value: ''});
      }
    }

    this.changeDetectorRef.detectChanges();
    this.unsaved = true;
  }

  private deleteCurrentColumn() {
    console.debug(`Delete col #${this.toDeleteColNumber}`);

    this.displayColumnUsage = false;

    this.gridData.headers.splice(this.toDeleteColNumber , 1);
    for (const row of this.gridData.rows) {
      row.data.splice(this.toDeleteColNumber, 1);
    }
  }

  public getDataTableWidth() {
    return (window.innerWidth - 20) + 'px';
  }

  public getDataTableColWidth() {
    return '200px';
  }

  public setCurrentEditedCell(colIndex: number, rowIndex: number, rowValue: RowValue) {
    this.currentEditedCol = colIndex;
    this.currentEditedRow = rowIndex;
    this.currentEditedRowValue = rowValue;
    // console.debug(`currentEditedCol: ${this.currentEditedCol}, currentRow: ${this.currentEditedRow}, firstRow: ${this.firstRow}, rowsPerPage: ${this.rowsPerPage}`);
  }

  public resetCurrentEditedCell() {
    this.currentEditedCol = -1;
    this.currentEditedRow = -1;
    this.currentEditedRowValue = null;
    console.debug(`currentEditedCol: ${this.currentEditedCol}`);
  }

  public onHeadervalueChange() {
  }

  public setCurrentEditedHeader(headerIndex: number): void {
    this.currentEditedCol = headerIndex;
  }
}

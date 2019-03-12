import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Header } from '../app.component';

@Component({
  selector: 'ask-editable-header',
  templateUrl: './editable-header.component.html',
  styleUrls: ['./editable-header.component.less']
})
export class EditableHeaderComponent implements OnInit, AfterViewInit {

  @Output() onEdit = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter<number>();

  @Input() header: Header;
  @Input() index: number;

  public inEdition: boolean;

  private inFocus: boolean;
  private selectAllOnFocus: boolean = true;
  MAX_HEADER_LENGTH: number = 30;

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit(): void {
    if (this.header && this.header.focus) {
      this.inFocus = true;
      this.inEdition = true;
    }
  }

  public enterEdition() {
    this.inEdition = true;
    this.inFocus = true;
    this.selectAllOnFocus = false;
  }

  public exitEdition() {
      this.normalizeString();
      this.inEdition = false;
      this.onBlur.emit();
  }

  public onChangeValue() {
    console.debug(`On change!!!`);
    this.header.new = undefined;
    this.onEdit.emit();
  }

  public isInputInFocus() {
    if (this.inFocus) {
      this.header.focus = undefined;
      this.inFocus = false;
      return true;
    }

    return false;
  }

  public setCurrentEditedCell(index: number) {
    this.onFocus.emit(index);

    // Reset the select all on focus flag to default value
    this.selectAllOnFocus = true;
  }

  private normalizeString() {
    // Trim and remove any extra whitespace characters
    this.header.name = this.header.name.trim().replace(/\s+/g, ' ');
  }

}

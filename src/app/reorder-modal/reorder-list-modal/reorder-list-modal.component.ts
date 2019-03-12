import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ReorderListComponent} from '../reorder-list/reorderlist.component';
import {Observable} from 'rxjs';
import { Dialog } from 'primeng/dialog';

/**
 * Generic component which accepts an array who will be displayed in a PrimeNg Dialog holding an OrderList to allow reordering.
 * Created to handle the multiple models needing to be reordered.
 */
@Component({
  selector: 'ask-reorderlist-modal',
  templateUrl: './reorder-list-modal.component.html',
  styleUrls: ['./reorder-list-modal.component.less']
})
export class ReorderListModalComponent {

  /**
   * Modal header text
   */
  @Input() header: String;

  /**
   * Header String text of the
   * Example: 'Name'
   */
  @Input() listHeader: String;

  /**
   * 2d array which holds the data to be reordered.
   * Ex: Scenario[] [Scenario1, scenario3, scenario2]
   */
  @Input() value: any[];

  /**
   * Property to be shown in the list. No property means that value should be of a primitive type
   */
  @Input() property: String;

  // Component events
  @Output() onSave = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<boolean>();

  public reorderModalDisplay: Boolean = false;
  public isReorderInProgress: Boolean = false;

  @Input() widthPercent: number = 60;
  @Input() heightPercent: number = 50;

  @ViewChild('dialog') dialog: Dialog;

  get width(): number {
    return window.innerWidth * this.widthPercent / 100;
  }

  get height(): number {
    return window.innerHeight * this.heightPercent / 100;
  }

  @ViewChild(ReorderListComponent) reorderListComponent: ReorderListComponent;

  constructor() {}

  /**
   * Initializing method which validates the data and returns whether the validation passed
   * @returns {Observable<boolean>}
   */
  public open(): void {
      if (!this.reorderListComponent.isValid()){
        this.onShow.emit(false);
      }
      else{

        this.isReorderInProgress = false;
        // this.dialog.positionOverlay();
        this.reorderModalDisplay = true;
      }
  }

  /**
   * Save button action, emits onSave to let parent know the data is ready.
   * Lets the parent handle when to close the modal
   */
  public save(): void {
    this.isReorderInProgress = true;
    this.onSave.emit(true);
  }

  /**
   * Public close function the parent can call post-save or the user can call for dismissing the modal.
   */
  public close(): void {
      this.reorderModalDisplay = false;
  }

  /**
   * Maps to the onHide event of the dialog.
   * onHide emits that the save did not happen.
   */
  public onHide(): void {
    this.onSave.emit(false);
  }

  public onShowEvent(): void {
    this.onShow.emit(true);
  }

  getContentHeight(): string {
    return `calc(${this.heightPercent}vh - 100px)`;
  }

  getContentWidth(): string {
    return `calc(${this.widthPercent}vw - 90px)`;
  }
}

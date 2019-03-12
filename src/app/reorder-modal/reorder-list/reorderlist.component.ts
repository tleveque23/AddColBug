import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {OrderList} from 'primeng/primeng';

/**
 * PrimeNG OrderList configured to reorder generic arrays of primitive and non-primitive arrays.
 */
@Component({
  selector: 'ask-reorderList',
  templateUrl: './reorderlist.component.html',
  styleUrls: ['./reorderlist.component.less'],
  // encapsulation: ViewEncapsulation.None
})
export class ReorderListComponent {
  /**
   * OrderList header
   */
  @Input() header: String;

  /**
   * array used by the PrimeNH OrderList
   * Example [Scenario1,scenario3,scenario2]
   */
  @Input() value: any[];

  /**
   * enables/disables drag and drop
   */
  @Input() dragAndDrop: boolean;


  /**
   * Unique key if there are conflicts with other drag and drops
   */
  @Input() dragAndDropScope: String;

  /**
   * Property to be shown in the list. No property means that value should be of a primitive type
   */
  @Input() property: string;

  @Input() widthPercent: number = 60;

  @Input() height: string;

  @ViewChild(OrderList) orderListComponent: OrderList;

  public isValid(): boolean{
    return this.value && this.value.length && this.value.length > 0;
  }

  public getValue(item: any): any{
    if (this.property) {
      return eval('item.' + this.property);
    }
    return item;
  }

}

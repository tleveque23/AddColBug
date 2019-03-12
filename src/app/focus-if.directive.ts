import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

/**
 * This directive will focus if the given condition is met
 */

@Directive({
  selector: '[askFocusIf]'
})
export class FocusIfDirective implements AfterViewChecked{

  @Input() askFocusIf: boolean;
  @Input() selectAllOnFocus: boolean = false;

  constructor(private element: ElementRef) { }

  public ngAfterViewChecked(): void {
    // console.debug(`******* ngAfterViewChecked`);

    if (this.askFocusIf) {
      // console.debug(`****** Must focus!: ${(this.element.nativeElement as HTMLElement).tagName}`);
      setTimeout(() => {

        /* Ok, why do we do a click before a focus? Well it seems that if we don't do that if it used on a input field inside a PrimeNg table,
         * that the field that was previously in "edit" mode will stay in that mode because it doesn't receive the proper event. And that could cause
         * strange behaviour.
         * */
        (this.element.nativeElement as HTMLElement).click();
        setTimeout( () => {
          (this.element.nativeElement as HTMLElement).focus();

          if (this.selectAllOnFocus) { // We also want to select all the current text in the filed. This will only work if called within an input field.
            const inputElem = this.element.nativeElement as HTMLInputElement;
            inputElem.setSelectionRange(0, inputElem.value.length);
          }
        }, 100);
      }, 100);
    }
  }

}

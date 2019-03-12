import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableHeaderComponent } from './editable-header/editable-header.component';
import { FormsModule } from '@angular/forms';
import { FocusIfDirective } from './focus-if.directive';
import { ButtonModule } from 'primeng/button';
import { DialogModule, OrderListModule } from 'primeng/primeng';
import { ReorderListComponent } from './reorder-modal/reorder-list/reorderlist.component';
import { ReorderListModalComponent } from './reorder-modal/reorder-list-modal/reorder-list-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableHeaderComponent,
    FocusIfDirective,
    ReorderListComponent,
    ReorderListModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ButtonModule,
    OrderListModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

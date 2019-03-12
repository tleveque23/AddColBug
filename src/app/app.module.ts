import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableHeaderComponent } from './editable-header/editable-header.component';
import { FormsModule } from '@angular/forms';
import { FocusIfDirective } from './focus-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditableHeaderComponent,
    FocusIfDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

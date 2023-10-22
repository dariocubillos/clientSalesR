import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import { NodeService } from '../services/example.service';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    TreeTableModule,
    AnimateModule,
    SelectButtonModule,
    FormsModule,
    DialogModule,
    InputSwitchModule,
    DropdownModule,
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Core Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSelectModule, MdInputModule } from '@angular/material';

// Component Imports
import { AppComponent } from './app.component';
import { TestPage1Component } from './test-page-1/test-page-1.component';

// Service Imports
import { GeneratorRequestService } from './services/generator-request.service';

@NgModule({
  declarations: [
    AppComponent,
    TestPage1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdInputModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    GeneratorRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrMaskerIonic3 } from './directives/brmasker-ionic-3';


@NgModule({
  declarations: [
    BrMaskerIonic3
  ],
  exports: [
    BrMaskerIonic3
  ],
  imports: [
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BrMaskerModule {}

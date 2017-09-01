import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaskerModule } from './components/masker/masker.module';

@NgModule({
  exports: [
    MaskerModule
  ],
  imports: [
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BrMaskerModule {}

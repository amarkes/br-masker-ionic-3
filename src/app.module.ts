import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaskerModule } from './components/masker/masker.module';

@NgModule({
  declarations: [
    MaskerModule
  ],
  exports: [
    MaskerModule
  ],
  imports: [
    MaskerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BrMaskerModule {}

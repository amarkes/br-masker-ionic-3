import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrMaskerIonic3 } from './directives/brmasker-ionic-3';
import { BrMaskerIonicServices3 } from './directives/brmasker-ionic-services';


@NgModule({
  declarations: [
    BrMaskerIonic3,
    BrMaskerIonicServices3
  ],
  exports: [
    BrMaskerIonic3,
    BrMaskerIonicServices3
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [BrMaskerIonicServices3]
})
export class BrMaskerModule {}

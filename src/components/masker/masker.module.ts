import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskerDirective } from './masker.component';

@NgModule({
  declarations: [MaskerDirective],
  exports: [MaskerDirective]
})
export class MaskerModule { }

import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyComponent } from './components/my-component';
import { MyProvider } from './providers/my-provider';

@NgModule({
  declarations: [
    MyComponent
  ],
  providers: [ MyProvider ],
  exports: [
    MyComponent
  ],
  imports: [
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MyModule {}

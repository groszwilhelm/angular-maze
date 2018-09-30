import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { BoardModule } from './board/board.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

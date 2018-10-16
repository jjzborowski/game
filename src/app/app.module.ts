import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BoardComponent,
  MepelComponent,
  PlayerComponent,
  TileComponent
} from '@components';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MepelComponent,
    PlayerComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorComponent } from './components/color/color.component';
import { VscodeService } from './vscode.service';
import { ColorItemComponent } from './components/color-item/color-item.component';

@NgModule({
  declarations: [AppComponent, ColorComponent, ColorItemComponent],
  imports: [BrowserModule],
  providers: [VscodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

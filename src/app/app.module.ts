import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorComponent } from './components/color/color.component';
import { VscodeService } from './vscode.service';

@NgModule({
  declarations: [AppComponent, ColorComponent],
  imports: [BrowserModule],
  providers: [VscodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

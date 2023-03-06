import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Configs } from './glob.interface';
import { VscodeService } from './vscode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public config: Observable<Configs> = this.vscodeService.message$.pipe(
    map((item) => item.message)
  );
  constructor(private vscodeService: VscodeService) {}
}

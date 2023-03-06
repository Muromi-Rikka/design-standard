import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable, shareReplay, tap } from 'rxjs';
import { Configs } from './glob.interface';

@Injectable({
  providedIn: 'root',
})
export class VscodeService {
  public vscode: any;
  public message$ = fromEvent<MessageEvent<any>>(window, 'message').pipe(
    filter((item) => item.data && item.data.type && item.data.message),
    map((item) => item.data)
  );

  constructor() {
    // @ts-ignore
    this.vscode = window['acquireVsCodeApi']();
  }

  public postMessage(command: string, text: string) {
    this.vscode.postMessage({
      command,
      text,
    });
  }
}

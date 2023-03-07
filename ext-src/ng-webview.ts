import { readFileSync } from 'fs';
import * as path from 'path';
import { Configs } from '../src/app/glob.interface';
import * as vscode from 'vscode';

export default class WebNgView {
  public static currentPanel: WebNgView | undefined;

  private readonly view: vscode.WebviewView;
  private readonly context?: vscode.ExtensionContext;

  private disposables: vscode.Disposable[] = [];
  private configuration: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('design-standard');
  constructor(context: vscode.ExtensionContext, view: vscode.WebviewView) {
    this.context = context;
    this.view = view;
    this.update();

    this.view.onDidChangeVisibility(
      () => {
        if (this.view && this.view.visible) {
          this.update();
        }
      },
      null,
      this.disposables
    );

    this.view.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  public getProvider() {
    // return new CommitFormatProvider(this.view)
  }

  public static createOrShow(context: vscode.ExtensionContext) {}

  private update(): void {
    this.view.title = 'design standard';
    this.view.webview.html = this.getHtmlForWebview();
  }

  private getHtmlForWebview(): string {
    const appDistPath = path.join(this.context!.extensionPath, 'dist');
    const appDistPathUri = vscode.Uri.file(appDistPath);

    const baseUri = this.view.webview.asWebviewUri(appDistPathUri);

    const indexPath = path.join(appDistPath, 'index.html');
    let indexHtml = readFileSync(indexPath, { encoding: 'utf-8' });
    indexHtml = indexHtml.replace(
      '<base href="/">',
      `<base href="${String(baseUri)}/">`
    );
    return indexHtml;
  }

  public dispose() {
    WebNgView.currentPanel = undefined;
    while (this.disposables.length) {
      const stack = this.disposables.pop();
      if (stack) {
        stack.dispose();
      }
    }
  }
}

export class DesignStandardProvider implements vscode.WebviewViewProvider {
  private _context: vscode.ExtensionContext;
  private _config: Configs;
  private _configPath: string;
  private configuration: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('design-standard');
  constructor(
    context: vscode.ExtensionContext,
    config: Configs,
    configPath: string
  ) {
    this._context = context;
    this._config = config;
    this._configPath = configPath;
  }

  private getHtmlForWebview(baseUri: string): string {
    const appDistPath = path.join(this._context!.extensionPath, 'dist');
    const indexPath = path.join(appDistPath, 'index.html');
    let indexHtml = readFileSync(indexPath, { encoding: 'utf-8' });
    indexHtml = indexHtml.replace(
      '<base href="/">',
      `<base href="${baseUri}/">`
    );
    return indexHtml;
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    const appDistPath = path.join(this._context!.extensionPath, 'dist');
    const appDistPathUri = vscode.Uri.file(appDistPath);
    webviewView.webview.options = { enableScripts: true };
    const html = this.getHtmlForWebview(
      String(webviewView.webview.asWebviewUri(appDistPathUri))
    );
    webviewView.webview.html = html;
    webviewView.webview.onDidReceiveMessage(
      this.handleOnDidReceiveMessage(webviewView)
    );
    webviewView.webview.postMessage({ type: 'config', message: this._config });

    // vscode.commands.registerCommand('commitFormat.configRefresh', () => {
    //   this._config = JSON.parse(readFileSync(this._configPath).toString());
    //   webviewView.webview.postMessage({
    //     type: 'config',
    //     message: this._config,
    //   });
    // });
  }

  private handleOnDidReceiveMessage(webviewView: vscode.WebviewView) {
    return (message: any) => {
      if (message.command === 'commit') {
      }
    };
  }
}

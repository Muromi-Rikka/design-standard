import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';
import { DesignStandardProvider } from './ng-webview';

export const activate = (context: vscode.ExtensionContext): void => {
  if (vscode.workspace.workspaceFolders) {
    const projectPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const configPath = join(projectPath, 'design-standard.json');
    const hasConfig = existsSync(configPath);
    if (hasConfig) {
      const config = JSON.parse(readFileSync(configPath).toString());
      const designStandardProvider = new DesignStandardProvider(
        context,
        config,
        configPath
      );
      vscode.window.registerWebviewViewProvider(
        'design-standard',
        designStandardProvider,
        { webviewOptions: { retainContextWhenHidden: true } }
      );
    }
  }
};

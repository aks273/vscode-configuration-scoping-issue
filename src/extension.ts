import * as vscode from 'vscode';

const CONFIG_KEY = 'configScopingIssue.machineString';

export function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel('Configuration Scoping Issue', { log: true });
	context.subscriptions.push(outputChannel);

	function logConfigValue() {
		outputChannel.info('Logging configuration value:');
		outputChannel.info(vscode.workspace.getConfiguration().get<string>(CONFIG_KEY, ""));
		outputChannel.info(JSON.stringify(vscode.workspace.getConfiguration().inspect<string>(CONFIG_KEY), null, 2));
	}

	logConfigValue();

	const configListener = vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration(CONFIG_KEY)) {
			logConfigValue();
		}
	});
	context.subscriptions.push(configListener);
}

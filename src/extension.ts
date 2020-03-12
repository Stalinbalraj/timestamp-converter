// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var timestamp = '123456789000';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timestamp-converter" is now active!');


	// const editor = vscode.window.activeTextEditor;
	// const selectedText = editor?.selection;
	// const text = editor?.document.getText(selectedText);
	// console.log(text);
	// let dataOutput = new Date(Number(text));
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// vscode.window.onDidChangeActiveTextEditor(() => {
	// 	console.log('onDidChangeActiveTextEditor');
	// });
	// vscode.window.onDidChangeTextEditorOptions(() => {
	// 	console.log('onDidChangeTextEditorOptions');
	// });
	// vscode.workspace.onDidChangeTextDocument(changeEvent => {
	// 	console.log(`Did change: ${changeEvent.document.uri}`);
	// });

	vscode.window.onDidChangeTextEditorSelection((data) => {
		console.log(data);
		const editor = vscode.window.activeTextEditor;

		const selectedText = editor?.selection;
		const text = editor?.document.getText(selectedText);
		console.log(text);
		let dataOutput: any = new Date(Number(text));
		vscode.commands.executeCommand('editor.action.showHover');
		vscode.window.showInformationMessage(dataOutput);
		vscode.window.showInformationMessage('' + dataOutput);
		//vscode.window.showQuickPick('output'+ dataOutput);
	});
	//editor.action.showHover

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS COde!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

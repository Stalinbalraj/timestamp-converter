// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
// var timestamp = '123456789000';

// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "timestamp-converter" is now active!');

// 	// vscode.languages.registerHoverProvider(
// 	// 	'javascript',
// 	// 	new class implements vscode.HoverProvider {
// 	// 		provideHover(
// 	// 			_document: vscode.TextDocument,
// 	// 			_position: vscode.Position,
// 	// 			_token: vscode.CancellationToken
// 	// 		): vscode.ProviderResult<vscode.Hover> {
// 	// 			const commentCommandUri = vscode.Uri.parse(`command:editor.action.showHover`);
// 	// 			//	const commentCommandUri = `convert to this format`;

// 	// 			// console.log(data);
// 	// 			const editor = vscode.window.activeTextEditor;

// 	// 			const selectedText = editor?.selection;
// 	// 			const text = editor?.document.getText(selectedText);
// 	// 			console.log(text);
// 	// 			let dataOutput: any = new Date(Number(text));
// 	// 			const contents = new vscode.MarkdownString(` ${dataOutput} [convert](${commentCommandUri}) [copy](${commentCommandUri})`);
// 	// 			// To enable command URIs in Markdown content, you must set the `isTrusted` flag.
// 	// 			// When creating trusted Markdown string, make sure to properly sanitize all the
// 	// 			// input content so that only expected command URIs can be executed
// 	// 			contents.isTrusted = true;

// 	// 			return new vscode.Hover(contents);
// 	// 		}
// 	// 	}()
// 	// );
// 	// const editor = vscode.window.activeTextEditor;
// 	// const selectedText = editor?.selection;
// 	// const text = editor?.document.getText(selectedText);
// 	// console.log(text);
// 	// let dataOutput = new Date(Number(text));
// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	// vscode.window.onDidChangeActiveTextEditor(() => {
// 	// 	console.log('onDidChangeActiveTextEditor');
// 	// });
// 	// vscode.window.onDidChangeTextEditorOptions(() => {
// 	// 	console.log('onDidChangeTextEditorOptions');
// 	// });
// 	// vscode.workspace.onDidChangeTextDocument(changeEvent => {
// 	// 	console.log(`Did change: ${changeEvent.document.uri}`);
// 	// });

// 	vscode.window.onDidChangeTextEditorSelection((data) => {
// 		console.log(data);
// 		const editor = vscode.window.activeTextEditor;

// 		const selectedText = editor?.selection;
// 		const text = editor?.document.getText(selectedText);
// 		console.log(text);
// 		let dataOutput: any = new Date(Number(text));
// 		const contents = new vscode.MarkdownString(` ${dataOutput}`);
// 		// To enable command URIs in Markdown content, you must set the `isTrusted` flag.
// 		// When creating trusted Markdown string, make sure to properly sanitize all the
// 		// input content so that only expected command URIs can be executed
// 		contents.isTrusted = true;
// 		//	vscode.commands.executeCommand('editor.action.showHover');
// 		//vscode.window.showInformationMessage(dataOutput);
// 		// vscode.window.showInformationMessage('' + dataOutput);
// 		new vscode.Hover(contents);
// 		//vscode.window.showQuickPick('output'+ dataOutput);
// 	});
// 	//editor.action.showHover

// 	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello VS COde!');
// 	});

// 	context.subscriptions.push(disposable);
// }



// // this method is called when your extension is deactivated
// export function deactivate() { }



// import * as vscode from 'vscode';

// let myStatusBarItem: vscode.StatusBarItem;

// export function activate({ subscriptions }: vscode.ExtensionContext) {

// 	// register a command that is invoked when the status bar
// 	// item is selected
// 	const myCommandId = 'extension.helloWorld';
// 	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
// 		let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
// 		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
// 	}));

// 	// create a new status bar item that we can now manage
// 	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
// 	myStatusBarItem.command = myCommandId;
// 	subscriptions.push(myStatusBarItem);

// 	// register some listener that make sure the status bar 
// 	// item always up-to-date
// 	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
// 	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

// 	// update status bar item once at start
// 	updateStatusBarItem();
// }

// function updateStatusBarItem(): void {
// 	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
// 	if (n > 0) {
// 		myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
// 		myStatusBarItem.show();
// 	} else {
// 		myStatusBarItem.hide();
// 	}
// }

// function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
// 	let lines = 0;
// 	if (editor) {
// 		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
// 	}
// 	return lines;
// }
'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	var enableExtension: Boolean = false;
	vscode.commands.registerCommand('extension.helloWorld', () => {

		vscode.window.showInformationMessage('Hover Converter Enabled');
		enableExtension = true;

	});

	vscode.commands.registerCommand('extension.disableHoverconverter', () => {

		enableExtension = false;
		vscode.window.showInformationMessage('Hover Converter Disabled');

	});

	var regexHex = /^0x[0-9a-fA-F]+$/g;
	var regexHexc = /^[0-9a-fA-F]+[h]$/g;
	var regexDec = /^-?[0-9]+$/g;

	let hover = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
		provideHover(document, position, token) {
			var hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			var markdownString = new vscode.MarkdownString();

			if ((regexHex.test(hoveredWord.toString()) || regexHexc.test(hoveredWord.toString())) && enableExtension) {

				markdownString.appendCodeblock(`Dec:\n${parseInt(hoveredWord, 16)}\nBinary:\n${parseInt(hoveredWord, 16).toString(2)}`, 'javascript');

				return {
					contents: [markdownString]
				};
			}

			else if (regexDec.test(hoveredWord.toString()) && enableExtension) {
				const dataOutput = new Date(Number(hoveredWord.toString()));
				const gmt = new Date(Number(hoveredWord.toString())).toUTCString();
				//var input: Number = Number(hoveredWord.toString()); toUTCString()

				const output = EpochToHuman(hoveredWord);
				console.log(output);
				markdownString.appendCodeblock(`GMT:\n ${gmt}\nYour time zone:\n${dataOutput} `, 'javascript');

				return {
					contents: [markdownString]
				};

			}

		}
	});

	context.subscriptions.push(hover);

	function cleanTimestamp(ts: any) {
		if (!ts) {
			return "";
		}
		ts = ts.replace(/[`'"\s\,]+/g, '');
		if (ts.charAt(ts.length - 1) == "L") {
			ts = ts.slice(0, -1);
		}
		return ts;
	}

	function isHex(h: any) {
		var a = parseInt(h, 16);
		return (a.toString(16) === h.toLowerCase())
	}
	// function Ax() {
	// 	var d = $(location).attr('hostname');
	// 	if ((d.search(/sja/i) > 0) || (d.search(/hconverte/i) > 3) || d.search(/ogl/i) > 0) {
	// 		return 1;
	// 	} else {
	// 		return 0;
	// 	}
	// }
	function isValidDate(d: any) {
		if (Object.prototype.toString.call(d) !== "[object Date]")
			return false;
		return !isNaN(d.getTime());
	}

	function EpochToHuman(hoveredWord: any) {
		var iorg = hoveredWord;
		var hr = "<br/>&nbsp;";
		var errormessage = "Sorry, this timestamp is not valid.<br/>Check your timestamp, strip letters and punctuation marks.";
		var outputtext = "";
		var notices = "";
		var inputtext = cleanTimestamp(iorg);
		if (inputtext && inputtext != iorg.trim()) {
			outputtext += "Converting " + inputtext + ":<br/>";
		}
		if ((inputtext.length === 0) || isNaN(inputtext)) {
			if (isHex(inputtext)) {
				inputtext = '0x' + inputtext;
			} else {
				// $("#result1").html(errormessage + hr);
				return;
			}
		}
		if (inputtext.substring(0, 2) == '0x') {
			outputtext += "Converting <a href=\"/hex?q=" + inputtext.substring(2) + "\">hexadecimal timestamp</a> to decimal: " + parseInt(inputtext) + "<br/>";
		}
		inputtext = inputtext * 1;
		// if (!Ax())
		// 	inputtext -= inputtext;
		var epoch = inputtext;
		var cn = '';
		var locale = 'en';
		if (locale.substring(0, 2) === 'en') {
			cn = ' class="utcal"';
		}
		if ((inputtext >= 10E7) && (inputtext < 18E7)) {
			notices += '<br/>Expected a more recent date? You are missing 1 digit.';
		}
		if ((inputtext >= 1E16) || (inputtext <= -1E16)) {
			outputtext += "Assuming that this timestamp is in <b>nanoseconds (1 billionth of a second)</b>:<br/>";
			inputtext = Math.floor(inputtext / 1000000);
		} else if ((inputtext >= 1E14) || (inputtext <= -1E14)) {
			outputtext += "Assuming that this timestamp is in <b>microseconds (1/1,000,000 second)</b>:<br/>";
			inputtext = Math.floor(inputtext / 1000);
		} else if ((inputtext >= 1E11) || (inputtext <= -3E10)) {
			outputtext += "Assuming that this timestamp is in <b>milliseconds</b>:<br/>";
		} else {
			outputtext += "Assuming that this timestamp is in <b>seconds</b>:<br/>";
			if ((inputtext > 1E11) || (inputtext < -1E10)) {
				notices += "<br>Remove the last 3 digits if you are trying to convert milliseconds.";
			}
			inputtext = (inputtext * 1000);
		}
		if (inputtext < -68572224E5) {
			notices += "<br/>Dates before 14 september 1752 (pre-Gregorian calendar) are not accurate.";
		}
		//var datum = new Date(inputtext);

		// if (isValidDate(datum)) {
		// 	var convertedDate = datum.epochConverterGMTString();
		// 	var relativeDate = datum.relativeDate();
		// 	outputtext += "<b" + cn + ">GMT</b>: " + convertedDate;
		// 	outputtext += "<br/><b" + cn + ">Your time zone</b>: <span title=\"" + datum.toDateString() + " " + datum.toTimeString() + "\">" + datum.epochConverterLocaleString(1) + "</span>";
		// 	if (typeof moment !== "undefined") {
		// 		outputtext += " <a title=\"convert to other time zones\" href=\"https://www.epochconverter.com/timezones?q=" + epoch + "\">" + datum.printLocalTimezone() + "</a>";
		// 		var md = moment(datum);
		// 		if (md.isDST()) {
		// 			outputtext += ' <span class="help" title="daylight saving/summer time">DST</span>';
		// 			if (datum.getFullYear() < 1908)
		// 				notices += '<br/>DST (Daylight Saving Time) was first used around 1908.<br/>Your browser uses the current DST rules for all dates in history.';
		// 		}
		// 	}
		// 	if (relativeDate) {
		// 		outputtext += "<br/><b" + cn + ">Relative</b>: " + relativeDate.capitalize();
		// 	}
		// 	if (notices)
		// 		outputtext += "<br/><br/>Note: " + notices;
		// } else {
		// 	outputtext += errormessage;
		// }
		// $("#result1").html(outputtext + hr);
		return inputtext;
	}

}

export function deactivate() { }
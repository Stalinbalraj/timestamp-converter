
'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	var enableExtension: Boolean = true;
	// vscode.commands.registerCommand('extension.timestampConverter', () => {
	// 	// console.log('running');
	// 	vscode.window.showInformationMessage('Timestamp Converter is Enabled');
	// 	enableExtension = true;

	// });

	// vscode.commands.registerCommand('extension.deactivateTimestampConverter', () => {

	// 	enableExtension = false;
	// 	vscode.window.showInformationMessage('Timestamp Converter Disabled');

	// });


	var regexDec = /^-?[0-9]+$/g;

	let hover = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
		provideHover(document, position, token) {
			var hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			const output = EpochToHuman(hoveredWord);
			var markdownString = new vscode.MarkdownString(output?.outputtext, true);
			if (regexDec.test(hoveredWord.toString()) && enableExtension) {


				const dataOutput = new Date(Number(output?.inputtext.toString()));
				const gmt = new Date(Number(output?.inputtext.toString())).toUTCString();
				markdownString.appendCodeblock(` GMT \n ${gmt}\n Your time zone \n ${dataOutput} `, 'javascript');
				if (output?.notices) {
					markdownString.appendCodeblock(` ${output?.notices} `, 'javascript');
				}
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
		if (ts.charAt(ts.length - 1) === "L") {
			ts = ts.slice(0, -1);
		}
		return ts;
	}

	function isHex(h: any) {
		var a = parseInt(h, 16);
		return (a.toString(16) === h.toLowerCase());
	}


	function EpochToHuman(hoveredWord: any) {
		var iorg = hoveredWord;
		var outputtext = "";
		var notices = "";
		var inputtext = cleanTimestamp(iorg);
		if (inputtext && inputtext !== iorg.trim()) {
			outputtext += "Converting " + inputtext + ":";
		}
		if ((inputtext.length === 0) || isNaN(inputtext)) {
			if (isHex(inputtext)) {
				inputtext = '0x' + inputtext;
			} else {
				return;
			}
		}

		inputtext = inputtext * 1;

		if ((inputtext >= 1E16) || (inputtext <= -1E16)) {
			outputtext += "Assuming that this timestamp is in nanoseconds (1 billionth of a second):";
			inputtext = Math.floor(inputtext / 1000000);
		} else if ((inputtext >= 1E14) || (inputtext <= -1E14)) {
			outputtext += "Assuming that this timestamp is in microseconds (1/1,000,000 second):";
			inputtext = Math.floor(inputtext / 1000);
		} else if ((inputtext >= 1E11) || (inputtext <= -3E10)) {
			outputtext += "Assuming that this timestamp is in milliseconds:";
		} else {
			outputtext += "Assuming that this timestamp is in seconds:";
			if ((inputtext > 1E11) || (inputtext < -1E10)) {
				notices += "<br>Remove the last 3 digits if you are trying to convert milliseconds.";
			}
			inputtext = (inputtext * 1000);
		}
		if (inputtext < -68572224E5) {
			notices += "Dates before 14 september 1752 (pre-Gregorian calendar) are not accurate.";
		}

		return {
			inputtext: inputtext,
			outputtext: outputtext,
			notices: notices
		};
	}

}

export function deactivate() { }
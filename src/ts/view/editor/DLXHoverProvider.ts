/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { OPCODES } from "../../model/processor/instructions/Opcodes";

export class DLXHoverProvider implements monaco.languages.HoverProvider {
	public provideHover(model: monaco.editor.ITextModel, position: monaco.Position): monaco.languages.Hover {
		const word = model.getWordAtPosition(position);
		let contents: monaco.IMarkdownString[] = [];
		
		if (word !== null && word.word in OPCODES) {
			contents = [{
				value: OPCODES[word.word].describe()
			}];
		}
		
		return {
			contents: contents,
			range: {
				startColumn: word.startColumn,
				endColumn: word.endColumn,
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber
			}
		};
	}
}

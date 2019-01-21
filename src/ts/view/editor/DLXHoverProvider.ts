/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { OPCODES } from "../../model/processor/operations/Opcodes";

export class DLXHoverProvider implements monaco.languages.HoverProvider {
	public provideHover(model: monaco.editor.ITextModel, position: monaco.Position): monaco.languages.Hover {
		const word = model.getWordAtPosition(position);
		
		if (word != null && word.word in OPCODES) {
			return {
				contents: OPCODES[word.word].map(op => <monaco.IMarkdownString> {
					value: op.describe()
				}),
				range: {
					startColumn: word.startColumn,
					endColumn: word.endColumn,
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber
				}
			};
		} else {
			return {
				contents: []
			};
		}
	}
}

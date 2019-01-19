/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { OPCODES } from "../../model/instructions/Opcodes";

export class DLXCompletionProvider implements monaco.languages.CompletionItemProvider {
	provideCompletionItems(): monaco.languages.CompletionList {
		return {
			suggestions: Object.keys(OPCODES)
				.map(opc => <monaco.languages.CompletionItem> {
					label: opc,
					kind: monaco.languages.CompletionItemKind.Keyword,
					insertText: opc
				})
		};
	}
}
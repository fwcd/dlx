/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { DLXCompletionProvider } from "./DLXCompletionProvider";
import { DLX_GRAMMAR } from "./DLXGrammar";

const DLX_LANGUAGE_ID = "dlx-assembly";

export class EditorView {
	private editor: monaco.editor.IStandaloneCodeEditor;
	
	public initialize(): void {
		const element = document.getElementById("editor");
		this.setupLanguageConfig();
		this.editor = monaco.editor.create(element, {
			language: DLX_LANGUAGE_ID,
			minimap: {
				enabled: false
			},
			scrollBeyondLastLine: false,
			autoIndent: true,
			renderIndentGuides: false,
			wordBasedSuggestions: false,
			theme: "vs-dark"
		});
	}
	
	private setupLanguageConfig(): void {
		monaco.languages.register({ id: DLX_LANGUAGE_ID });
		monaco.languages.setMonarchTokensProvider(DLX_LANGUAGE_ID, DLX_GRAMMAR);
		monaco.languages.registerCompletionItemProvider(DLX_LANGUAGE_ID, new DLXCompletionProvider());
	}
	
	public relayout(): void {
		this.editor.layout();
	}
}

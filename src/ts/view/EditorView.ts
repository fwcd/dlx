/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />

import { DLX_GRAMMAR } from "./grammar/DLXGrammar";

export class EditorView {
	private editor: monaco.editor.IStandaloneCodeEditor;
	
	public initialize(): void {
		const editorWidget = document.getElementById("editor");
		this.setupLanguageConfig();
		this.editor = monaco.editor.create(editorWidget, {
			language: "dlx-assembly",
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
		monaco.languages.register({ id: "dlx-assembly" });
		monaco.languages.setMonarchTokensProvider("dlx-assembly", DLX_GRAMMAR);
	}
	
	public relayout(): void {
		this.editor.layout();
	}
}

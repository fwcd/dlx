/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { DLXCompletionProvider } from "./DLXCompletionProvider";
import { DLX_GRAMMAR } from "./DLXGrammar";
import { DLXLanguageConfiguration } from "./DLXLanguageConfiguration";

const DLX_LANGUAGE_ID = "dlx-assembly";

export class EditorView {
	private editor: monaco.editor.IStandaloneCodeEditor;
	
	public initialize(): void {
		const element = document.getElementById("editor");
		this.setupLanguage();
		this.editor = monaco.editor.create(element, {
			language: DLX_LANGUAGE_ID,
			minimap: {
				enabled: false
			},
			scrollBeyondLastLine: false,
			autoIndent: true,
			renderIndentGuides: true,
			wordBasedSuggestions: false,
			theme: "vs-dark"
		});
		this.editor.getModel().updateOptions({
			tabSize: 8,
			insertSpaces: true
		});
	}
	
	private setupLanguage(): void {
		monaco.languages.register({ id: DLX_LANGUAGE_ID });
		monaco.languages.setMonarchTokensProvider(DLX_LANGUAGE_ID, DLX_GRAMMAR);
		monaco.languages.registerCompletionItemProvider(DLX_LANGUAGE_ID, new DLXCompletionProvider());
		monaco.languages.setLanguageConfiguration(DLX_LANGUAGE_ID, new DLXLanguageConfiguration());
	}
	
	public relayout(): void {
		this.editor.layout();
	}
}

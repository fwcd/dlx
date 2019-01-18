/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />

export class EditorView {
	private editor: monaco.editor.IStandaloneCodeEditor;
	
	public initialize(): void {
		const editorWidget = document.getElementById("editor");
		this.editor = monaco.editor.create(editorWidget, {
			language: "dlx-assembly",
			minimap: {
				enabled: false
			},
			scrollBeyondLastLine: false,
			autoIndent: true,
			renderIndentGuides: false,
			wordBasedSuggestions: false
		});
	}
	
	public relayout(): void {
		this.editor.layout();
	}
}

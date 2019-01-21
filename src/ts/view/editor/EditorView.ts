/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { FileStateModel } from "../../model/file/FileStateModel";
import { DLXCompletionProvider } from "./DLXCompletionProvider";
import { DLXDefinitionProvider } from "./DLXDefinitionProvider";
import { diagnosticsToMarkers } from "./DLXDiagnosticsConverter";
import { DLX_GRAMMAR } from "./DLXGrammar";
import { DLXHoverProvider } from "./DLXHoverProvider";
import { DLXLanguageConfiguration } from "./DLXLanguageConfiguration";
import { DLXRenameProvider } from "./DLXRenameProvider";
import { EditorLineHighlighter } from "./EditorLineHighlighter";

const DLX_LANGUAGE_ID = "dlx-assembly";

export class EditorView {
	private element = document.getElementById("editor");
	private fileStateModel: FileStateModel;
	private editor: monaco.editor.IStandaloneCodeEditor;
	private lineHighlighter: EditorLineHighlighter;
	
	public constructor(fileStateModel: FileStateModel) {
		this.fileStateModel = fileStateModel;
	}
	
	public initialize(): void {
		this.setupLanguage();
		this.editor = monaco.editor.create(this.element, {
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
		this.lineHighlighter = new EditorLineHighlighter(this.editor);
		this.editor.getModel().updateOptions({
			tabSize: 8,
			insertSpaces: false,
			trimAutoWhitespace: false
		});
		this.setupModelListeners();
	}
	
	private setupModelListeners(): void {
		const editorModel = this.editor.getModel();
		editorModel.onDidChangeContent(e => {
			this.updateModel(editorModel);
		});
		this.fileStateModel.addDiagnosticsListener(diags => {
			monaco.editor.setModelMarkers(editorModel, DLX_LANGUAGE_ID, diagnosticsToMarkers(diags));
		});
	}
	
	private updateModel(editorModel: monaco.editor.ITextModel) {
		this.fileStateModel.setText(editorModel.getLinesContent());
	}

	private setupLanguage(): void {
		monaco.languages.register({ id: DLX_LANGUAGE_ID });
		monaco.languages.setMonarchTokensProvider(DLX_LANGUAGE_ID, DLX_GRAMMAR);
		monaco.languages.registerCompletionItemProvider(DLX_LANGUAGE_ID, new DLXCompletionProvider());
		monaco.languages.setLanguageConfiguration(DLX_LANGUAGE_ID, new DLXLanguageConfiguration());
		monaco.languages.registerDefinitionProvider(DLX_LANGUAGE_ID, new DLXDefinitionProvider());
		monaco.languages.registerRenameProvider(DLX_LANGUAGE_ID, new DLXRenameProvider());
		monaco.languages.registerHoverProvider(DLX_LANGUAGE_ID, new DLXHoverProvider());
	}
	
	public relayout(): void {
		this.editor.layout();
	}
	
	public highlightLine(lineIndex: number): void {
		this.lineHighlighter.highlight(lineIndex);
	}
	
	public clearHighlighting(): void {
		this.lineHighlighter.removeHighlightings();
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

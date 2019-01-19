/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { DLXCompletionProvider } from "./DLXCompletionProvider";
import { DLX_GRAMMAR } from "./DLXGrammar";
import { DLXLanguageConfiguration } from "./DLXLanguageConfiguration";
import { DLXDefinitionProvider } from "./DLXDefinitionProvider";
import { DLXRenameProvider } from "./DLXRenameProvider";
import { DLXHoverProvider } from "./DLXHoverProvider";
import { FileStateModel } from "../../model/file/FileStateModel";
import { Debouncer } from "../../model/utils/Debouncer";
import { diagnosticsToMarkers } from "./DLXDiagnosticsConverter";

const DLX_LANGUAGE_ID = "dlx-assembly";

export class EditorView {
	private fileStateModel: FileStateModel;
	private editor: monaco.editor.IStandaloneCodeEditor;
	private modelUpdateDebouncer = new Debouncer(250);
	
	public constructor(fileStateModel: FileStateModel) {
		this.fileStateModel = fileStateModel;
	}
	
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
			insertSpaces: false
		});
		this.setupModelListeners();
	}
	
	private setupModelListeners(): void {
		const editorModel = this.editor.getModel();
		editorModel.onDidChangeContent(e => {
			this.modelUpdateDebouncer.runMaybe(() => {
				this.fileStateModel.setText(editorModel.getLinesContent());
			});
		});
		this.fileStateModel.addDiagnosticsListener(diags => {
			monaco.editor.setModelMarkers(editorModel, DLX_LANGUAGE_ID, diagnosticsToMarkers(diags));
		});
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
}

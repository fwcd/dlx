/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import * as fs from "fs";
import { ParsedProgram } from "../../model/ParsedProgram";
import { DLXCompletionProvider } from "./DLXCompletionProvider";
import { DLXDefinitionProvider } from "./DLXDefinitionProvider";
import { diagnosticsToMarkers } from "./DLXDiagnosticsConverter";
import { DLX_GRAMMAR } from "./DLXGrammar";
import { DLXHoverProvider } from "./DLXHoverProvider";
import { DLXLanguageConfiguration } from "./DLXLanguageConfiguration";
import { DLXRenameProvider } from "./DLXRenameProvider";
import { EditorLineHighlighter } from "./EditorLineHighlighter";
import { FileLoaderModel } from "../../model/FileLoaderModel";
import { BreakpointsView } from "./BreakpointsView";

const DLX_LANGUAGE_ID = "dlx-assembly";

export class EditorView {
	private element = document.getElementById("editor");
	private parsedProgram: ParsedProgram;
	private editor: monaco.editor.IStandaloneCodeEditor;
	private lineHighlighter: EditorLineHighlighter;
	private fileLoader: FileLoaderModel;
	
	public constructor(parsedProgram: ParsedProgram, fileLoader: FileLoaderModel) {
		this.parsedProgram = parsedProgram;
		this.fileLoader = fileLoader;
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
			theme: "vs-dark",
			glyphMargin: true,
			lineNumbersMinChars: 3
		});
		this.lineHighlighter = new EditorLineHighlighter(this.editor);
		new BreakpointsView(this.parsedProgram.getBreakpointManager(), this.editor);
		this.editor.getModel().updateOptions({
			tabSize: 8,
			insertSpaces: true,
			trimAutoWhitespace: false
		});
		this.setupModelListeners();
		this.setupFileLoader();
	}
	
	private setupModelListeners(): void {
		const editorModel = this.editor.getModel();
		editorModel.onDidChangeContent(e => {
			this.onUpdateModel(editorModel);
		});
		this.parsedProgram.addDiagnosticsListener(diags => {
			monaco.editor.setModelMarkers(editorModel, DLX_LANGUAGE_ID, diagnosticsToMarkers(diags));
		});
	}
	
	private onUpdateModel(editorModel: monaco.editor.ITextModel): void {
		this.parsedProgram.setText(editorModel.getLinesContent());
		this.parsedProgram.getBreakpointManager().fireListeners();
		this.fileLoader.onChangeFile();
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
	
	private setupFileLoader(): void {
		this.fileLoader.addClearListener(() => {
			this.editor.getModel().setValue("");
		});
		this.fileLoader.addSaveListener(filePath => {
			fs.writeFile(filePath, this.editor.getModel().getValue(), {
				encoding: "utf-8"
			}, err => {
				if (err) {
					console.log(err);
				}
			});
		});
		this.fileLoader.addOpenListener(filePath => {
			fs.readFile(filePath, "utf-8", (err, data) => {
				if (err) {
					console.log(err);
				} else {
					this.editor.getModel().setValue(data);
					this.fileLoader.onLoad(filePath);
				}
			});
		});
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

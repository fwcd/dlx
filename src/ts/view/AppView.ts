import * as Split from "split.js";
import * as path from "path";
import { AppModel } from "../model/AppModel";
import { AssemblyExecutor } from "../model/processor/AssemblyExecutor";
import { Listener } from "../model/utils/ListenerList";
import { ControlsView } from "./controls/ControlsView";
import { EditorView } from "./editor/EditorView";
import { FileLoaderView } from "./FileLoaderView";
import { StorageView } from "./storage/StorageView";

export const APP_VERSION = 1.0;

export class AppView {
	private model: AppModel;
	private editor: EditorView;
	private storage = new StorageView();
	private fileLoader: FileLoaderView;
	private controls: ControlsView;
	
	private executorListener?: Listener<AssemblyExecutor>;
	
	public constructor() {
		this.model = new AppModel();
		this.editor = new EditorView(this.model.getParsedProgram());
		this.controls = new ControlsView(this.model);
		this.fileLoader = new FileLoaderView(this.model.getFileLoader());
		this.setupTitle();
	}
	
	private setupTitle(): void {
		this.model.getFileLoader().addPathListener(filePath => {
			document.title = "DLX Assembly Simulator" + (filePath ? (" - " + path.basename(filePath)) : "")
		})
	}
	
	public initializeStorage(): void {
		this.storage.initialize(this.model.getProcessorState().getStorage());
	}
	
	public initializeEditor(): void {
		this.editor.initialize();
		window.addEventListener("resize", () => this.editor.relayout());
		
		this.model.getSettings().addHighlightListener(highlight => {
			if (highlight) {
				if (!this.executorListener) {
					this.executorListener = executor => {
						if (executor != null) {
							executor.addLineListener(index => {
								if (index >= 0) {
									this.editor.highlightLine(index);
								} else {
									this.editor.clearHighlighting();
								}
							});
						}
					};
					this.model.addExecutorListener(this.executorListener);
				}
			} else {
				if (this.executorListener) {
					this.model.removeExecutorListener(this.executorListener);
					this.executorListener = null;
				}
				this.editor.clearHighlighting();
			}
		});
	}
	
	public postInitialize(): void {
		// Source: https://split.js.org/
		Split([this.editor.getElement(), this.storage.getElement()], {
			elementStyle: (dimension, size, gutterSize) => ({
				'flex-basis': `calc(${size}% - ${gutterSize}px)`,
			}),
			minSize: 200,
			gutterStyle: (dimension, gutterSize) => ({
				'flex-basis': `${gutterSize}px`,
			}),
			onDrag: () => {
				this.editor.relayout();
			}
		});
	}
	
	public getFileLoader(): FileLoaderView { return this.fileLoader; }
}

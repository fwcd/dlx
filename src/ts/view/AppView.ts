import * as path from "path";
import * as Split from "split.js";
import { AppModel } from "../model/AppModel";
import { AssemblyExecutor } from "../model/processor/AssemblyExecutor";
import { Listener } from "../model/utils/ListenerList";
import { ControlsView } from "./controls/ControlsView";
import { EditorView } from "./editor/EditorView";
import { FileLoaderView } from "./FileLoaderView";
import { OverlayView } from "./overlay/OverlayView";
import { StorageView } from "./sidebox/storage/StorageView";
import { TabPaneView } from "./utils/TabPaneView";

export const APP_VERSION = 1.0;

export class AppView {
	private model: AppModel;
	private editor: EditorView;
	private storage = new StorageView();
	private fileLoader: FileLoaderView;
	private controls: ControlsView;
	private overlay = new OverlayView();
	
	private executorListener?: Listener<AssemblyExecutor>;
	
	public constructor() {
		this.model = new AppModel();
		this.editor = new EditorView(this.model.getParsedProgram(), this.model.getFileLoader(), this.model.getSettings());
		this.controls = new ControlsView(this.model, this.overlay);
		// this.pipeline = new PipelineView(this.model.getPipeline());
		this.fileLoader = new FileLoaderView(this.model.getFileLoader());
		this.setupTitle();
		
		new TabPaneView(document.getElementById("sidebox-tabbar"), document.getElementById("sidebox-tabpane"));
	}
	
	private setupTitle(): void {
		const loader = this.model.getFileLoader();
		loader.addPathListener(() => this.updateTitle());
		loader.addSavedListener(() => this.updateTitle());
	}
	
	private updateTitle(): void {
		const loader = this.model.getFileLoader();
		const filePath = loader.getCurrentPath();
		const saved = this.model.getFileLoader().isSaved();
		
		document.title = "DLX Assembly Simulator"
			+ (filePath ? (" - " + path.basename(filePath)) : "")
			+ (saved ? "" : "*");
	}
	
	public initializeStorage(): void {
		this.storage.initialize({
			model: this.model.getProcessorState().getStorage(),
			registersFormat: this.model.getRegistersFormat(),
			memoryFormat: this.model.getMemoryFormat(),
			settings: this.model.getSettings()
		});
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
		const sidebox = document.getElementById("sidebox");
		
		// Source: https://split.js.org/
		Split([this.editor.getElement(), sidebox], {
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
	
	public getControls(): ControlsView { return this.controls; }
}

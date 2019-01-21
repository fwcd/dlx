import { EditorView } from "./editor/EditorView";
import { StorageView } from "./storage/StorageView";
import { AppModel } from "../model/AppModel";
import { ControlsView } from "./controls/ControlsView";
import { Listener } from "../model/utils/ListenerList";
import { AssemblyExecutor } from "../model/processor/AssemblyExecutor";
import * as Split from "split.js";

export class AppView {
	private model: AppModel;
	private editor: EditorView;
	private storage = new StorageView();
	private controls: ControlsView;
	
	private executorListener?: Listener<AssemblyExecutor>;
	
	public constructor() {
		this.model = new AppModel();
		this.editor = new EditorView(this.model.getFileState());
		this.controls = new ControlsView(this.model);
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
}

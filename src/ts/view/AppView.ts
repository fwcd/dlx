import { EditorView } from "./editor/EditorView";
import { StorageView } from "./storage/StorageView";
import { AppModel } from "../model/AppModel";
import { ControlsView } from "./controls/ControlsView";

export class AppView {
	private model: AppModel;
	private editor: EditorView;
	private storage = new StorageView();
	private controls: ControlsView;
	
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
	}
}

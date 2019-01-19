import { EditorView } from "./editor/EditorView";
import { StorageView } from "./storage/StorageView";
import { AppModel } from "../model/AppModel";

export class AppView {
	private model: AppModel;
	private editor: EditorView;
	private storage = new StorageView();
	
	public constructor() {
		this.model = new AppModel();
		this.editor = new EditorView(this.model.getFileState());
	}
	
	public initializeStorage(): void {
		this.storage.initialize(this.model.getProcessorState().getStorage());
	}
	
	public initializeEditor(): void {
		this.editor.initialize();
		window.addEventListener("resize", () => this.editor.relayout());
	}
}

import { EditorView } from "./editor/EditorView";
import { StorageView } from "./storage/StorageView";
import { AppModel } from "../model/AppModel";

export class AppView {
	private model = new AppModel();
	private editor = new EditorView();
	private storage = new StorageView();
	
	public initializeStorage(): void {
		this.storage.initialize(this.model.getState().getStorage());
	}
	
	public initializeEditor(): void {
		this.editor.initialize();
		window.addEventListener("resize", () => this.editor.relayout());
	}
}

import { EditorView } from "./editor/EditorView";

export class AppView {
	private editor = new EditorView();
	
	public initializeEditor(): void {
		this.editor.initialize();
		window.addEventListener("resize", () => this.editor.relayout());
	}
}

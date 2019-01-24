import { ListenerList, Listener } from "./utils/ListenerList";

/**
 * Contains user settings.
 */
export class SettingsModel {
	private highlightLines = true;
	private instructionDelay = 40;
	private editorTheme = "vs-dark";
	
	private instructionDelayListeners = new ListenerList<number>();
	private editorThemeListeners = new ListenerList<string>();
	private highlightListeners = new ListenerList<boolean>();
	
	public getInstructionDelay(): number { return this.instructionDelay; }
	
	public setInstructionDelay(instructionDelay: number): void { this.instructionDelay = instructionDelay; }
	
	public getEditorTheme(): string { return this.editorTheme; }
	
	public setEditorTheme(editorTheme: string): void { this.editorTheme = editorTheme; }
	
	public getHighlightLines(): boolean { return this.highlightLines; }
	
	public setHighlightLines(highlightLines: boolean): void {
		this.highlightLines = highlightLines;
		this.highlightListeners.fire(highlightLines);
	}
	
	public addHighlightListener(listener: Listener<boolean>, callerID?: number): void {
		this.highlightListeners.add(listener, callerID);
		listener(this.highlightLines);
	}
	
	public removeHighlightListener(listener: Listener<boolean>): void {
		this.highlightListeners.remove(listener);
	}
	
	public addInstructionDelayListener(listener: Listener<number>, callerID?: number): void {
		this.instructionDelayListeners.add(listener, callerID);
	}
	
	public removeInstructionDelayListener(listener: Listener<number>): void {
		this.instructionDelayListeners.remove(listener);
	}
	
	public addEditorThemeListener(listener: Listener<string>, callerID?: number): void {
		this.editorThemeListeners.add(listener, callerID);
	}
	
	public removeEditorThemeListener(listener: Listener<string>): void {
		this.editorThemeListeners.remove(listener);
	}
}

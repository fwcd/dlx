import { ListenerList, Listener } from "./utils/ListenerList";

/**
 * Contains user settings.
 */
export class SettingsModel {
	private highlightLines = false;
	private highlightListeners = new ListenerList<boolean>();
	
	public getHighlightLines(): boolean { return this.highlightLines; }
	
	public setHighlightLines(highlightLines: boolean): void {
		this.highlightLines = highlightLines;
		this.highlightListeners.fire(highlightLines);
	}
	
	public addHighlightListener(listener: Listener<boolean>): void { this.highlightListeners.add(listener); }
	
	public removeHighlightListener(listener: Listener<boolean>): void { this.highlightListeners.remove(listener); }
}

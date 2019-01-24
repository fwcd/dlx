import { ListenerList, Listener } from "./utils/ListenerList";

/**
 * Contains user settings.
 */
export class SettingsModel {
	private highlightLines = true;
	private signedInts = true;
	private highlightListeners = new ListenerList<boolean>();
	private signedIntsListeners = new ListenerList<boolean>();
	
	public getHighlightLines(): boolean { return this.highlightLines; }
	
	public useSignedInts(): boolean { return this.signedInts; }
	
	public setHighlightLines(highlightLines: boolean): void {
		this.highlightLines = highlightLines;
		this.highlightListeners.fire(highlightLines);
	}
	
	public setUseSignedInts(signedInts: boolean): void {
		this.signedInts = signedInts;
	}
	
	public addHighlightListener(listener: Listener<boolean>, callerID?: number): void {
		this.highlightListeners.add(listener, callerID);
		listener(this.highlightLines);
	}
	
	public removeHighlightListener(listener: Listener<boolean>): void {
		this.highlightListeners.remove(listener);
	}
	
	public addSignedIntsListener(listener: Listener<boolean>, callerID?: number): void {
		this.signedIntsListeners.add(listener, callerID);
	}
	
	public removeSignedIntsListener(listener: Listener<boolean>): void {
		this.signedIntsListeners.remove(listener);
	}
}

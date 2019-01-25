import { ListenerList, Listener } from "./utils/ListenerList";

/**
 * Contains user settings.
 */
export class SettingsModel {
	private highlightLines = true;
	private instructionDelay = 40;
	private storageCellWidth = 35;
	private registerCount = 32;
	private memoryStartAddress = 1000;
	private memorySize = 1024;
	private editorTheme = "vs-dark";
	
	private registerCountListeners = new ListenerList<number>();
	private memoryStartAddressListeners = new ListenerList<number>();
	private memorySizeListeners = new ListenerList<number>();
	private instructionDelayListeners = new ListenerList<number>();
	private storageCellWidthListeners = new ListenerList<number>();
	private editorThemeListeners = new ListenerList<string>();
	private highlightListeners = new ListenerList<boolean>();
	
	public getInstructionDelay(): number { return this.instructionDelay; }
	
	public setInstructionDelay(instructionDelay: number): void { this.instructionDelay = instructionDelay; }
	
	public getEditorTheme(): string { return this.editorTheme; }
	
	public setEditorTheme(editorTheme: string): void {
		this.editorTheme = editorTheme;
		this.editorThemeListeners.fire(editorTheme);
	}
	
	public getStorageCellWidth(): number { return this.storageCellWidth; }
	
	public setStorageCellWidth(storageCellWidth: number): void {
		this.storageCellWidth = storageCellWidth;
		this.storageCellWidthListeners.fire(storageCellWidth);
	}
	
	public getMemorySize(): number { return this.memorySize; }
	
	public setMemorySize(memorySize: number): void {
		this.memorySize = memorySize;
		this.memorySizeListeners.fire(memorySize);
	}
	
	public getMemoryStartAddress(): number { return this.memoryStartAddress; }
	
	public setMemoryStartAddress(memoryStartAddress: number): void {
		this.memoryStartAddress = memoryStartAddress;
		this.memoryStartAddressListeners.fire(memoryStartAddress);
	}
	
	public getHighlightLines(): boolean { return this.highlightLines; }
	
	public setHighlightLines(highlightLines: boolean): void {
		this.highlightLines = highlightLines;
		this.highlightListeners.fire(highlightLines);
	}
	
	public getRegisterCount(): number { return this.registerCount; }
	
	public setRegisterCount(registerCount: number): void {
		this.registerCount = registerCount;
		this.registerCountListeners.fire(registerCount);
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
		listener(this.instructionDelay);
	}
	
	public removeInstructionDelayListener(listener: Listener<number>): void {
		this.instructionDelayListeners.remove(listener);
	}
	
	public addEditorThemeListener(listener: Listener<string>, callerID?: number): void {
		this.editorThemeListeners.add(listener, callerID);
		listener(this.editorTheme);
	}
	
	public removeEditorThemeListener(listener: Listener<string>): void {
		this.editorThemeListeners.remove(listener);
	}
	
	public addStorageCellWidthListener(listener: Listener<number>, callerID?: number): void {
		this.storageCellWidthListeners.add(listener, callerID);
		listener(this.storageCellWidth);
	}
	
	public removeStorageCellWidthListener(listener: Listener<number>): void {
		this.storageCellWidthListeners.remove(listener);
	}
	
	public addMemorySizeListener(listener: Listener<number>, callerID?: number): void {
		this.memorySizeListeners.add(listener, callerID);
	}
	
	public removeMemorySizeListener(listener: Listener<number>): void {
		this.memorySizeListeners.remove(listener);
	}
	
	public addMemoryStartAddressListener(listener: Listener<number>, callerID?: number): void {
		this.memoryStartAddressListeners.add(listener, callerID);
	}
	
	public removeMemoryStartAddressListener(listener: Listener<number>): void {
		this.memoryStartAddressListeners.remove(listener);
	}
	
	public addRegisterCountListener(listener: Listener<number>, callerID?: number): void {
		this.registerCountListeners.add(listener, callerID);
	}
	
	public removeRegisterCountListener(listener: Listener<number>): void {
		this.registerCountListeners.remove(listener);
	}
	
	public removeAllListenersFor(callerID: number): void {
		this.editorThemeListeners.removeByID(callerID);
		this.highlightListeners.removeByID(callerID);
		this.instructionDelayListeners.removeByID(callerID);
		this.storageCellWidthListeners.removeByID(callerID);
		this.registerCountListeners.removeByID(callerID);
		this.memorySizeListeners.removeByID(callerID);
		this.memoryStartAddressListeners.removeByID(callerID);
	}
}

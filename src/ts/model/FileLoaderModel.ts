import { ListenerList, Listener } from "./utils/ListenerList";

export class FileLoaderModel {
	private saved = false;
	private unedited = true;
	private currentPath?: string = null;
	private saveRequestListeners = new ListenerList<void>();
	private savedListeners = new ListenerList<boolean>();
	private uneditedListeners = new ListenerList<boolean>();
	private pathListeners = new ListenerList<string>();
	
	public isSaved(): boolean { return this.saved; }
	
	public setSaved(saved: boolean): void {
		this.saved = saved;
		this.savedListeners.fire(saved);
	}
	
	public isUnedited(): boolean { return this.unedited; }
	
	public setUnedited(unedited: boolean): void { this.unedited = unedited; }
	
	public getCurrentPath(): string | null { return this.currentPath; }
	
	public setCurrentPath(path: string): void {
		this.currentPath = path;
		this.pathListeners.fire(path);
	}
	
	public addSaveRequestListener(listener: Listener<void>): void {
		this.saveRequestListeners.add(listener);
	}
	
	public removeSaveRequestListener(listener: Listener<void>): void {
		this.saveRequestListeners.remove(listener);
	}
	
	public addSavedListener(listener: Listener<boolean>): void {
		this.savedListeners.add(listener);
		listener(this.saved);
	}
	
	public removeSavedListener(listener: Listener<boolean>): void {
		this.savedListeners.remove(listener);
	}
	
	public addUneditedListener(listener: Listener<boolean>): void {
		this.uneditedListeners.add(listener);
		listener(this.unedited);
	}
	
	public removeUneditedListener(listener: Listener<boolean>): void {
		this.uneditedListeners.remove(listener);
	}
	
	public addPathListener(listener: Listener<string>): void {
		this.pathListeners.add(listener);
		listener(this.currentPath);
	}
	
	public removePathListener(listener: Listener<string>): void {
		this.pathListeners.remove(listener);
	}
}

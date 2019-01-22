import { ListenerList, Listener } from "./utils/ListenerList";

export class FileLoaderModel {
	private saved = false;
	private unedited = true;
	private currentPath?: string = null;
	
	private saveListeners = new ListenerList<string>();
	private openListeners = new ListenerList<string>();
	private clearListeners = new ListenerList<void>();
	private saveRequestListeners = new ListenerList<void>();
	private savedListeners = new ListenerList<boolean>();
	private uneditedListeners = new ListenerList<boolean>();
	private pathListeners = new ListenerList<string>();
	
	public openFile(filePath: string): void {
		this.openListeners.fire(filePath);
	}
	
	public saveFile(filePath: string): void {
		this.saveListeners.fire(filePath);
		this.setCurrentPath(filePath);
		this.setSaved(true);
	}
	
	public clear(): void {
		this.clearListeners.fire();
	}
	
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
	
	public addSaveListener(listener: Listener<string>): void { this.saveListeners.add(listener); }
	
	public removeSaveListener(listener: Listener<string>): void { this.saveListeners.remove(listener); }
	
	public addOpenListener(listener: Listener<string>): void { this.openListeners.add(listener); }
	
	public removeOpenListener(listener: Listener<string>): void { this.openListeners.remove(listener); }
	
	public addClearListener(listener: Listener<void>): void { this.clearListeners.add(listener); }
	
	public removeClearListener(listener: Listener<void>): void { this.clearListeners.remove(listener); }
	
	public onLoad(filePath: string): void {
		this.setUnedited(true);
		this.setCurrentPath(filePath);
		this.setSaved(true);
	}
	
	public onChangeFile(): void {
		this.setUnedited(false);
		if (this.isSaved()) {
			this.setSaved(false);
		}
	}
}

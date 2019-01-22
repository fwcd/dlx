import { remote } from "electron";
import { FileLoaderModel } from "../model/FileLoaderModel";
import { ListenerList, Listener } from "../model/utils/ListenerList";

export class FileLoaderView {
	private model: FileLoaderModel;
	private saveListeners = new ListenerList<string>();
	private openListeners = new ListenerList<string>();
	private clearListeners = new ListenerList<string>();
	
	public constructor(model: FileLoaderModel) {
		this.model = model;
	}
	
	public onLoad(filePath: string): void {
		this.model.setUnedited(true);
		this.model.setCurrentPath(filePath);
		this.model.setSaved(true);
	}
	
	public onChangeFile(): void {
		this.model.setUnedited(false);
		if (this.model.isSaved()) {
			this.model.setSaved(false);
		}
	}
	
	public showOpenDialog(): void {
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
			properties: ["openFile"]
		}, files => {
			if (files && (files.length > 0)) {
				if (this.confirmIfUnsaved()) {
					this.openFile(files[0]);
				}
			}
		});
	}
	
	public showSaveAsDialog(): void {
		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {}, fileName => {
			if (fileName) {
				this.saveFile(fileName);
			}
		});
	}
	
	private confirmIfUnsaved(): boolean {
		if (this.model.isSaved() || this.model.isUnedited()) {
			return true;
		} else {
			return confirm("The file is not saved. Are you sure?");
		}
	}
	
	public newFile(): void {
		if (this.confirmIfUnsaved()) {
			this.clearListeners.fire("");
			this.model.setCurrentPath(null);
			this.model.setSaved(true);
			this.model.setUnedited(true);
		}
	}
	
	public save(): void {
		if (this.model.getCurrentPath() != null) {
			this.saveFile(this.model.getCurrentPath());
		} else {
			this.showSaveAsDialog();
		}
	}
	
	private openFile(filePath: string): void {
		this.openListeners.fire(filePath);
	}
	
	private saveFile(filePath: string): void {
		this.saveListeners.fire(filePath);
		this.model.setCurrentPath(filePath);
		this.model.setSaved(true);
	}
	
	public addSaveListener(listener: Listener<string>): void {
		this.saveListeners.add(listener);
	}
	
	public removeSaveListener(listener: Listener<string>): void {
		this.saveListeners.remove(listener);
	}
}

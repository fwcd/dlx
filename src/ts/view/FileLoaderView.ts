import * as remote from "@electron/remote";
import { FileLoaderModel } from "../model/FileLoaderModel";

export class FileLoaderView {
	private model: FileLoaderModel;
	
	public constructor(model: FileLoaderModel) {
		this.model = model;
	}
	
	public showOpenDialog(): void {
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
			properties: ["openFile"]
		}).then(res => {
			if (!res.canceled && (res.filePaths.length > 0)) {
				if (this.confirmIfUnsaved()) {
					this.model.openFile(res.filePaths[0]);
				}
			}
		});
	}
	
	public showSaveAsDialog(): void {
		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {}).then(res => {
			if (!res.canceled) {
				this.model.saveFile(res.filePath);
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
			this.model.clear();
			this.model.setCurrentPath(null);
			this.model.setSaved(true);
			this.model.setUnedited(true);
		}
	}
	
	public save(): void {
		if (this.model.getCurrentPath() != null) {
			this.model.saveFile(this.model.getCurrentPath());
		} else {
			this.showSaveAsDialog();
		}
	}
}

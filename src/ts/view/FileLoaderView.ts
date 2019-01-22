import { remote } from "electron";
import { FileLoaderModel } from "../model/FileLoaderModel";

export class FileLoaderView {
	private model: FileLoaderModel;
	
	public constructor(model: FileLoaderModel) {
		this.model = model;
	}
	
	public showOpenDialog(): void {
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
			properties: ["openFile"]
		}, files => {
			if (files && (files.length > 0)) {
				if (this.confirmIfUnsaved()) {
					this.model.openFile(files[0]);
				}
			}
		});
	}
	
	public showSaveAsDialog(): void {
		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {}, fileName => {
			if (fileName) {
				this.model.saveFile(fileName);
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

import { AppView, APP_VERSION } from "./AppView";
import { remote } from "electron";

const { Menu } = remote;

export class MenuBarView {
	private menuTemplate: Electron.MenuItemConstructorOptions[];
	
	public constructor(app: AppView) {
		this.menuTemplate = [
			{
				label: "File",
				submenu: [
					{
						label: "New",
						accelerator: "CmdOrCtrl+N",
						click(): void { app.getFileLoader().newFile(); }
					},
					{
						label: "Open",
						accelerator: "CmdOrCtrl+O",
						click(): void { app.getFileLoader().showOpenDialog(); }
					},
					{
						label: "Save",
						accelerator: "CmdOrCtrl+S",
						click(): void { app.getFileLoader().save(); }
					},
					{
						label: "Save As...",
						accelerator: "CmdOrCtrl+Shift+S",
						click(): void { app.getFileLoader().showSaveAsDialog(); }
					}
				]
			},
			{
				label: "Edit",
				submenu: [
					{ role: 'cut' },
					{ role: 'copy' },
					{ role: 'paste' }
				]
			},
			{
				label: "Run",
				submenu: [
					{
						label: "Run",
						accelerator: "CmdOrCtrl+R",
						click(): void { app.getControls().performDebug(); }
					},
					{
						label: "Step",
						accelerator: "CmdOrCtrl+P",
						click(): void { app.getControls().performStep(); }
					},
					{
						label: "Pause/Resume",
						accelerator: "CmdOrCtrl+Shift+P",
						click(): void { app.getControls().performPause(); }
					},
					{
						label: "Stop",
						accelerator: "CmdOrCtrl+Shift+R",
						click(): void { app.getControls().performStop(); }
					}
				]
			},
			{
				label: "Other",
				submenu: [
					{
						role: "toggledevtools"
					},
					{
						label: "About DLX...",
						click(): void {
							alert("DLX Assembly Simulator v" + APP_VERSION + " by fwcd");
						}
					}
				]
			}
		];
		
		if (process.platform === "darwin") {
			// Insert application menu on macOS
			this.menuTemplate.unshift({
				label: "DLX",
				submenu: [
					{role: 'about'},
					{type: 'separator'},
					{role: 'services', submenu: []},
					{type: 'separator'},
					{role: 'hide'},
					{role: 'hideothers'},
					{role: 'unhide'},
					{type: 'separator'},
					{role: 'toggledevtools'},
					{type: 'separator'},
					{role: 'quit'}
				]
			});
		}
	}
	
	public build(): Electron.Menu {
		return Menu.buildFromTemplate(this.menuTemplate);
	}
}

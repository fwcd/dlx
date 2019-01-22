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
						click(): void {}
					},
					{
						label: "Open",
						accelerator: "CmdOrCtrl+O",
						click(): void {}
					},
					{
						label: "Save",
						accelerator: "CmdOrCtrl+S",
						click(): void {}
					},
					{
						label: "Save As...",
						accelerator: "CmdOrCtrl+Shift+S",
						click(): void {}
					},
					{ type: "separator" },
					{
						label: "Run",
						accelerator: "CmdOrCtrl+R",
						click(): void {}
					},
					{
						label: "Run Interpreter...",
						accelerator: "CmdOrCtrl+Shift+R",
						click(): void {}
					}
				]
			},
			{
				label: "Edit",
				submenu: [
					{role: 'cut'},
					{role: 'copy'},
					{role: 'paste'}
				]
			},
			{
				label: "About",
				submenu: [
					{
						label: "About DLX...",
						click(): void {
							alert("DLX v" + APP_VERSION + " by fwcd");
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

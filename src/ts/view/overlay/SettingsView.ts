import { SettingsModel } from "../../model/SettingsModel";

export class SettingsView {
	private element = document.createElement("div");
	
	public constructor(model: SettingsModel) {
		this.element.innerText = "Settings"; // TODO
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

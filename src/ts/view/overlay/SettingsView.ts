import { SettingsModel } from "../../model/SettingsModel";
import { Listener } from "../../model/utils/ListenerList";
import { IDGenerator } from "../utils/IDGenerator";

const SETTINGS_CALLER_ID = -75929827405666;
const SETTINGS_ID_GENERATOR = new IDGenerator("SettingsView");

export class SettingsView {
	private element = document.createElement("div");
	
	public constructor(model: SettingsModel) {
		model.addHighlightListener(this.addBoolSetting(
			"Highlight Lines",
			() => model.getHighlightLines(),
			v => model.setHighlightLines(v)),
			SETTINGS_CALLER_ID
		);
	}
	
	private addBoolSetting(name: string, getter: () => boolean, setter: (v: boolean) => void): Listener<boolean> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const checkbox = document.createElement("input");
		
		checkbox.type = "checkbox";
		checkbox.id = SETTINGS_ID_GENERATOR.nextID();
		checkbox.checked = getter();
		checkbox.addEventListener("change", () => setter(checkbox.checked));
		
		label.innerText = name;
		label.htmlFor = checkbox.id;
		
		wrapper.appendChild(checkbox);
		wrapper.appendChild(label);
		this.element.appendChild(wrapper);
		
		return v => checkbox.checked = v;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

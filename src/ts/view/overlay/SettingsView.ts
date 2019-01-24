import { SettingsModel } from "../../model/SettingsModel";
import { Listener } from "../../model/utils/ListenerList";
import { IDGenerator } from "../utils/IDGenerator";

const SETTINGS_CALLER_ID = -75929827405666;
const SETTINGS_ID_GENERATOR = new IDGenerator("SettingsView");

interface SettingParams<T> {
	name: string;
	getter: () => T;
	setter: (v: T) => void;
}

export class SettingsView {
	private element = document.createElement("div");
	
	public constructor(model: SettingsModel) {
		model.addHighlightListener(this.addBoolSetting({
			name: "Highlight Lines",
			getter: () => model.getHighlightLines(),
			setter: v => model.setHighlightLines(v)
		}), SETTINGS_CALLER_ID);
		model.addInstructionDelayListener(this.addNumberSetting({
			name: "Instruction Delay",
			getter: () => model.getInstructionDelay(),
			setter: v => model.setInstructionDelay(v)
		}), SETTINGS_CALLER_ID);
	}
	
	private addBoolSetting(params: SettingParams<boolean>): Listener<boolean> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const checkbox = document.createElement("input");
		
		checkbox.type = "checkbox";
		checkbox.id = SETTINGS_ID_GENERATOR.nextID();
		checkbox.checked = params.getter();
		checkbox.addEventListener("change", () => params.setter(checkbox.checked));
		
		label.innerText = params.name;
		label.htmlFor = checkbox.id;
		
		wrapper.appendChild(checkbox);
		wrapper.appendChild(label);
		this.element.appendChild(wrapper);
		
		return v => checkbox.checked = v;
	}
	
	private addNumberSetting(params: SettingParams<number>): Listener<number> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const field = document.createElement("input");
		
		label.innerText = params.name + ": ";
		
		field.type = "text";
		field.value = "" + params.getter();
		field.addEventListener("change", () => params.setter(+field.value));
		
		wrapper.appendChild(label);
		wrapper.appendChild(field);
		this.element.appendChild(wrapper);
		
		return v => field.value = "" + v;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

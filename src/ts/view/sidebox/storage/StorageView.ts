import { MemoryView } from "./MemoryView";
import { RegistersView } from "./RegistersView";
import { ProcessorStorage } from "../../../model/processor/ProcessorStorage";
import { FormatSelectorModel } from "../../../model/format/FormatSelectorModel";
import { SettingsModel } from "../../../model/SettingsModel";
import { View } from "../../utils/View";

export class StorageView implements View {
	private element = document.getElementById("storagebox");
	private registers = new RegistersView();
	private memory = new MemoryView();
	
	public initialize(params: {
		model: ProcessorStorage;
		registersFormat: FormatSelectorModel;
		memoryFormat: FormatSelectorModel;
		settings: SettingsModel;
	}): void {
		this.registers.initialize(params.model, params.registersFormat, params.settings);
		this.memory.initialize(params.model, params.memoryFormat, params.settings);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

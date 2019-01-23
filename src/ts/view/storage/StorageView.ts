import { MemoryView } from "./MemoryView";
import { RegistersView } from "./RegistersView";
import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";

export class StorageView {
	private element = document.getElementById("storagebox");
	private registers = new RegistersView();
	private memory = new MemoryView();
	
	public initialize(model: ProcessorStorage, registersFormat: FormatSelectorModel, memoryFormat: FormatSelectorModel): void {
		this.registers.initialize(model, registersFormat);
		this.memory.initialize(model, memoryFormat);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

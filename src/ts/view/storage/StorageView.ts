import { MemoryView } from "./MemoryView";
import { RegistersView } from "./RegistersView";
import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";

export class StorageView {
	private element = document.getElementById("storagebox");
	private registers = new RegistersView();
	private memory = new MemoryView();
	
	public initialize(model: ProcessorStorage, formatModel: FormatSelectorModel): void {
		this.registers.initialize(model, formatModel);
		this.memory.initialize(model, formatModel);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

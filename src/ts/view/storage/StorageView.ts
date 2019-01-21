import { MemoryView } from "./MemoryView";
import { RegistersView } from "./RegistersView";
import { ProcessorStorage } from "../../model/processor/ProcessorStorage";

export class StorageView {
	private element = document.getElementById("storagebox");
	private registers = new RegistersView();
	private memory = new MemoryView();
	
	public initialize(model: ProcessorStorage): void {
		this.registers.initialize(model);
		this.memory.initialize(model);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

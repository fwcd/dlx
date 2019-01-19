import { MemoryView } from "./MemoryView";
import { RegistersView } from "./RegistersView";
import { ProcessorStorage } from "../../model/ProcessorStorage";

export class StorageView {
	private registers = new RegistersView();
	private memory = new MemoryView();
	
	public initialize(model: ProcessorStorage): void {
		this.registers.initialize(model);
		this.memory.initialize(model);
	}
}

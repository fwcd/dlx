import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";

export class MemoryView {
	private element = document.getElementById("memory");
	
	public initialize(model: ProcessorStorage): void {
		// Create header
		const header = document.createElement("h3");
		header.innerText = "Memory";
		this.element.appendChild(header);
		
		// Create memory cells
		const wordCount = model.getMemoryWordCount();
		const startAddress = model.getMemoryStartAddress();
		
		for (let i = 0; i < wordCount; i++) {
			const address = startAddress + (i * 4);
			const cell = new StorageCellView(
				() => model.getMemoryWord(address),
				value => model.setMemoryWord(address, value, true /* silent */)
			);
			model.addMemoryWordListener(address, () => cell.update());
			this.element.appendChild(cell.getElement());
		}
	}
}

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
		const byteCount = model.getMemoryByteCount();
		
		for (let i = 0; i < byteCount; i++) {
			const cell = new StorageCellView(
				() => model.getMemoryByteByIndex(i),
				value => model.setMemoryByteByIndex(i, value)
			);
			this.element.appendChild(cell.getElement());
		}
	}
}

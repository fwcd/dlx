import { ProcessorStorage } from "../../model/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";

export class MemoryView {
	private element = document.getElementById("memory");
	
	public initialize(model: ProcessorStorage): void {
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
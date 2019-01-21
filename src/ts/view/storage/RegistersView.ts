import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";

export class RegistersView {
	private element = document.getElementById("registers");
	
	public initialize(model: ProcessorStorage): void {
		// Create header
		const header = document.createElement("div");
		header.classList.add("storage-header");
		
		const title = document.createElement("h3");
		title.innerText = "Registers";
		title.style.display = "inline";
		header.appendChild(title);
		
		const clearButton = document.createElement("button");
		clearButton.innerText = "Clear";
		clearButton.addEventListener("click", () => model.clearRegisters());
		header.appendChild(clearButton);
		
		this.element.appendChild(header);
		
		// Create registers
		const registerCount = model.getRegisterCount();
		const cellContainer = document.createElement("div");
		
		cellContainer.classList.add("storage-cell-container");
		
		for (let i = 0; i < registerCount; i++) {
			const cell = new StorageCellView(
				() => model.getRegister(i),
				value => model.setRegister(i, value, true /* silent */),
				"R" + i
			);
			if (i == 0) {
				cell.setChangeable(false);
			}
			model.addRegisterListener(i, () => cell.update());
			cellContainer.appendChild(cell.getElement());
		}
		
		this.element.appendChild(cellContainer);
	}
}

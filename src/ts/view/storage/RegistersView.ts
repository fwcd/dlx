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
		
		for (let i = 0; i < registerCount; i++) {
			const cell = new StorageCellView(
				() => model.getRegister(i),
				value => model.setRegister(i, value, true /* silent */)
			);
			if (i == 0) {
				cell.setChangeable(false);
			}
			model.addRegisterListener(i, () => cell.update());
			this.element.appendChild(cell.getElement());
		}
	}
}

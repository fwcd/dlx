import { ProcessorStorage } from "../../model/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";

export class RegistersView {
	private element = document.getElementById("registers");
	
	public initialize(model: ProcessorStorage): void {
		// Create header
		const header = document.createElement("h3");
		header.innerText = "Registers";
		this.element.appendChild(header);
		
		// Create registers
		const registerCount = model.getRegisterCount();
		
		for (let i = 0; i < registerCount; i++) {
			const cell = new StorageCellView(
				() => model.getRegister(i),
				value => model.setRegister(i, value)
			);
			if (i == 0) {
				cell.setChangeable(false);
			}
			this.element.appendChild(cell.getElement());
		}
	}
}

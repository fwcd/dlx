import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";
import { FormatSelectorView } from "./FormatSelectorView";
import { format } from "path";
import { SettingsModel } from "../../model/SettingsModel";

const REGISTERS_VIEW_CALLER_ID = -193820453422;

export class RegistersView {
	private element = document.getElementById("registers");
	
	public initialize(model: ProcessorStorage, formatModel: FormatSelectorModel, settings: SettingsModel): void {
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
		
		const formatView = new FormatSelectorView(formatModel);
		header.appendChild(formatView.getElement());
		
		this.element.appendChild(header);
		
		// Create registers
		const registerCount = model.getRegisterCount();
		const cellContainer = document.createElement("div");
		
		cellContainer.classList.add("storage-cell-container");
		
		for (let i = 0; i < registerCount; i++) {
			const cell = new StorageCellView({
				getter: () => model.getRegister(i),
				setter: value => model.setRegister(i, value, REGISTERS_VIEW_CALLER_ID),
				formatModel: formatModel,
				settings: settings,
				name: "R" + i
			});
			if (i == 0) {
				cell.setChangeable(false);
			}
			model.addRegisterListener(i, () => cell.update(), REGISTERS_VIEW_CALLER_ID);
			cellContainer.appendChild(cell.getElement());
		}
		
		this.element.appendChild(cellContainer);
	}
}

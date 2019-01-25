import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";
import { FormatSelectorView } from "./FormatSelectorView";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";
import { SettingsModel } from "../../model/SettingsModel";
import { CALLER_ID_GENERATOR } from "../../model/utils/NumberIdGenerator";

const MEMORY_VIEW_CALLER_ID = CALLER_ID_GENERATOR.nextID();

export class MemoryView {
	private element = document.getElementById("memory");
	
	public initialize(model: ProcessorStorage, formatModel: FormatSelectorModel, settings: SettingsModel): void {
		// Create header
		const header = document.createElement("div");
		header.classList.add("storage-header");
		
		const title = document.createElement("h3");
		title.innerText = "Memory";
		title.style.display = "inline";
		header.appendChild(title);
		
		const clearButton = document.createElement("button");
		clearButton.innerText = "Clear";
		clearButton.addEventListener("click", () => model.clearMemory());
		header.appendChild(clearButton);
		
		const formatView = new FormatSelectorView(formatModel);
		header.appendChild(formatView.getElement());
		
		this.element.appendChild(header);
		
		// Create memory cells
		const wordCount = model.getMemoryWordCount();
		const startAddress = model.getMemoryStartAddress();
		const cellContainer = document.createElement("div");
		
		cellContainer.classList.add("storage-cell-container");
		
		for (let i = 0; i < wordCount; i++) {
			const address = startAddress + (i * 4);
			const cell = new StorageCellView({
				getter: () => model.getMemoryWord(address),
				setter: value => model.setMemoryWord(address, value, MEMORY_VIEW_CALLER_ID),
				formatModel: formatModel,
				settings: settings,
				name: "" + address
			});
			model.addMemoryWordListener(address, () => cell.update(), MEMORY_VIEW_CALLER_ID);
			cellContainer.appendChild(cell.getElement());
		}
		
		this.element.appendChild(cellContainer);
	}
}

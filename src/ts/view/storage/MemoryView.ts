import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";
import { FormatSelectorView } from "./FormatSelectorView";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";
import { SettingsModel } from "../../model/SettingsModel";
import { CALLER_ID_GENERATOR } from "../../model/utils/NumberIdGenerator";

const MEMORY_VIEW_CALLER_ID = CALLER_ID_GENERATOR.nextID();

export class MemoryView {
	private model: ProcessorStorage;
	private formatModel: FormatSelectorModel;
	private settings: SettingsModel;
	
	private element = document.getElementById("memory");
	private cellContainer?: HTMLElement;
	
	public initialize(model: ProcessorStorage, formatModel: FormatSelectorModel, settings: SettingsModel): void {
		this.model = model;
		this.formatModel = formatModel;
		this.settings = settings;
		
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
		
		this.updateCellViews();
		model.addMemoryStartAddressListener(() => this.updateCellViews());
		model.addMemorySizeListener(() => this.updateCellViews());
		
		this.element.appendChild(header);
		this.element.appendChild(this.cellContainer);
	}
	
	private updateCellViews(): void {
		if (this.cellContainer) {
			this.model.removeMemoryWordListenersBy(MEMORY_VIEW_CALLER_ID);
			this.element.removeChild(this.cellContainer);
		}
		
		const wordCount = this.model.getMemoryWordCount();
		const startAddress = this.model.getMemoryStartAddress();
		
		this.cellContainer = document.createElement("div");
		this.cellContainer.classList.add("storage-cell-container");
		
		for (let i = 0; i < wordCount; i++) {
			const address = startAddress + (i * 4);
			const cell = new StorageCellView({
				getter: () => this.model.getMemoryWord(address),
				setter: value => this.model.setMemoryWord(address, value, MEMORY_VIEW_CALLER_ID),
				formatModel: this.formatModel,
				settings: this.settings,
				name: "" + address
			});
			this.model.addMemoryWordListener(address, () => cell.update(), MEMORY_VIEW_CALLER_ID);
			this.cellContainer.appendChild(cell.getElement());
		}
		
		this.element.appendChild(this.cellContainer);
	}
}

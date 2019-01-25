import { ProcessorStorage } from "../../model/processor/ProcessorStorage";
import { StorageCellView } from "./StorageCellView";
import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";
import { FormatSelectorView } from "./FormatSelectorView";
import { SettingsModel } from "../../model/SettingsModel";
import { CALLER_ID_GENERATOR } from "../../model/utils/NumberIdGenerator";

const REGISTERS_VIEW_CALLER_ID = CALLER_ID_GENERATOR.nextID();

export class RegistersView {
	private model: ProcessorStorage;
	private formatModel: FormatSelectorModel;
	private settings: SettingsModel;
	
	private element = document.getElementById("registers");
	private cellContainer?: HTMLElement;
	
	public initialize(model: ProcessorStorage, formatModel: FormatSelectorModel, settings: SettingsModel): void {
		this.model = model;
		this.formatModel = formatModel;
		this.settings = settings;
		
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
		
		this.updateCellViews();
		model.addRegisterCountListener(() => this.updateCellViews());
		
		this.element.appendChild(header);
		this.element.appendChild(this.cellContainer);
	}
	
	private updateCellViews(): void {
		if (this.cellContainer) {
			this.model.removeRegisterListenersBy(REGISTERS_VIEW_CALLER_ID);
			this.element.removeChild(this.cellContainer);
		}
		
		const registerCount = this.model.getRegisterCount();
		
		this.cellContainer = document.createElement("div");
		this.cellContainer.classList.add("storage-cell-container");
		
		for (let i = 0; i < registerCount; i++) {
			const cell = new StorageCellView({
				getter: () => this.model.getRegister(i),
				setter: value => this.model.setRegister(i, value, REGISTERS_VIEW_CALLER_ID),
				formatModel: this.formatModel,
				settings: this.settings,
				name: "R" + i
			});
			if (i == 0) {
				cell.setChangeable(false);
			}
			this.model.addRegisterListener(i, () => cell.update(), REGISTERS_VIEW_CALLER_ID);
			this.cellContainer.appendChild(cell.getElement());
		}
		
		this.element.appendChild(this.cellContainer);
	}
}

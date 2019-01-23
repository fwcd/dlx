import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";
import { DATA_FORMATS } from "../../model/format/DataFormats";

export class FormatSelectorView {
	private element = document.createElement("select");
	
	public constructor(model: FormatSelectorModel) {
		this.initializeOptions();
		this.element.addEventListener("change", () => {
			const selectedFormat = this.element.options[this.element.selectedIndex].value;
			model.setFormat(DATA_FORMATS[selectedFormat]);
		});
	}
	
	private initializeOptions(): void {
		for (let format in DATA_FORMATS) {
			const option = document.createElement("option");
			option.value = format;
			option.innerText = DATA_FORMATS[format].name;
			this.element.appendChild(option);
		}
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

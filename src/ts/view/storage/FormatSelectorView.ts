import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";

export class FormatSelectorView {
	private element = document.createElement("select");
	
	public constructor(model: FormatSelectorModel) {
		model.addFormatListener(format => {
			
		});
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

import { FormatSelectorModel } from "../../model/format/FormatSelectorModel";

export class StorageCellView {
	private element = document.createElement("div");
	private textField = document.createElement("input");
	private formatModel: FormatSelectorModel;
	private getter: () => number;
	
	public constructor(params: {
		getter: () => number,
		setter: (v: number) => void,
		formatModel: FormatSelectorModel,
		name?: string
	}) {
		this.getter = params.getter;
		this.formatModel = params.formatModel;
		this.element.classList.add("storage-cell");
		
		// Configure and add label
		
		if (params.name) {
			const label = document.createElement("label");
			label.innerText = params.name;
			this.element.appendChild(label);
		}
		
		// Configure and add text field
		
		this.textField.type = "text";
		this.update();
		this.textField.addEventListener("keyup", e => params.setter(params.formatModel.getFormat().stringToBinary(this.textField.value)));
		params.formatModel.addFormatListener(_format => this.update());
		
		this.element.appendChild(this.textField);
	}
	
	public update(): void {
		this.textField.value = this.formatModel.getFormat().binaryToString(this.getter());
	}
	
	public setChangeable(changeable: boolean): void {
		this.textField.disabled = !changeable;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

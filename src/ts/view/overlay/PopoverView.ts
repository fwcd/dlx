import { View } from "../utils/View";
import { Disposable } from "../../model/utils/Disposable";
import { contentTracing } from "electron";

export class PopoverView implements View, Disposable {
	private element = document.createElement("div");
	private content: View & Disposable;
	
	public constructor(content: View & Disposable, close: () => void) {
		this.content = content;
		this.element.classList.add("popover");
		
		const closeButton = document.createElement("button");
		closeButton.innerText = "Close";
		closeButton.addEventListener("click", () => close());
		this.element.appendChild(closeButton);
		
		this.element.appendChild(content.getElement());
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
	
	public dispose(): void {
		this.content.dispose();
	}
}

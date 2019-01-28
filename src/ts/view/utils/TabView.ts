import { View } from "./View";

export class TabView implements View {
	private element: HTMLElement;
	
	public constructor(element: HTMLElement) {
		this.element = element;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

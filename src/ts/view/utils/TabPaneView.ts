import { View } from "./View";

/**
 * A container panel for labelled tabs.
 */
export class TabPaneView implements View {
	private element: HTMLElement;
	
	public constructor(element: HTMLElement) {
		this.element = element;
		this.findExistingTabs();
	}
	
	public findExistingTabs(): void {
		const found = this.element.getElementsByClassName("tab");
		for (let i = 0; i < found.length; i++) {
			const tabElement = found.item(i) as HTMLElement;
			const name = tabElement.dataset.tabName;
			this.addTab(name, tabElement);
		}
	}
	
	public addTab(name: string, tabElement: HTMLElement): void {
		// TODO
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

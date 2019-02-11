import { View } from "./View";

/**
 * A container panel for labelled tabs.
 */
export class TabPaneView implements View {
	private paneElement: HTMLElement;
	private barElement: HTMLElement;
	
	public constructor(barElement: HTMLElement, paneElement: HTMLElement) {
		this.barElement = barElement;
		this.paneElement = paneElement;
		this.addExistingTabs();
	}
	
	public addExistingTabs(): void {
		const found = this.paneElement.getElementsByClassName("tabcontent");
		for (let i = 0; i < found.length; i++) {
			const tabElement = found.item(i) as HTMLElement;
			const name = tabElement.dataset.tabName;
			this.addTab(name, tabElement);
		}
	}
	
	public addTab(name: string, tabElement: HTMLElement): void {
		const tabButton = document.createElement("button");
		tabButton.classList.add("tabbutton", "tabbutton-unselected");
		tabButton.innerText = name;
		tabButton.addEventListener("click", () => {
			tabButton.classList.replace("tabbutton-unselected", "tabbutton-selected");
		});
		this.barElement.appendChild(tabButton);
	}
	
	public getElement(): HTMLElement {
		return this.paneElement;
	}
}

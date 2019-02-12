import { View } from "./View";

interface Tab {
	button: HTMLElement;
	content: HTMLElement;
	preferredDisplay: string;
}

const SELECTED_CLASS = "tabbutton-selected";
const UNSELECTED_CLASS = "tabbutton-unselected";

/**
 * A container panel for labelled tabs.
 */
export class TabPaneView implements View {
	private paneElement: HTMLElement;
	private barElement: HTMLElement;
	private selectedTab?: Tab;
	
	public constructor(barElement: HTMLElement, paneElement: HTMLElement) {
		this.barElement = barElement;
		this.paneElement = paneElement;
		this.addExistingTabs();
	}
	
	public addExistingTabs(): void {
		const found = this.paneElement.getElementsByClassName("tabcontent");
		for (let i = 0; i < found.length; i++) {
			const tabContent = found.item(i) as HTMLElement;
			const name = tabContent.dataset.tabName;
			this.addTab(name, tabContent);
		}
	}
	
	public addTab(name: string, tabContent: HTMLElement): void {
		// Configure button
		const tabButton = document.createElement("button");
		tabButton.classList.add("tabbutton", UNSELECTED_CLASS);
		tabButton.innerText = name;
		
		// Setup tab compound and listeners
		const tab = {
			button: tabButton,
			content: tabContent,
			preferredDisplay: tabContent.style.display
		};
		tabContent.style.display = "none";
		tabButton.addEventListener("click", () => this.select(tab));
		
		if (!this.selectedTab) {
			this.select(tab);
		}
		
		this.barElement.appendChild(tabButton);
	}
	
	private select(tab: Tab): void {
		// Hide previous tab if present
		if (this.selectedTab) {
			this.selectedTab.button.classList.replace(SELECTED_CLASS, UNSELECTED_CLASS);
			this.selectedTab.content.style.display = "none";
		}
		
		// Prepare and assign new tab
		tab.button.classList.replace(UNSELECTED_CLASS, SELECTED_CLASS);
		tab.content.style.display = tab.preferredDisplay;
		this.selectedTab = tab;
	}
	
	public getElement(): HTMLElement {
		return this.paneElement;
	}
}

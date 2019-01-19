import { AppModel } from "../../model/AppModel";
import { AssemblyExecutor } from "../../model/processor/AssemblyExecutor";

export class ControlsView {
	private model: AppModel;
	
	public constructor(model: AppModel) {
		this.model = model;
		
		const launchButton = document.getElementById("launchbutton");
		const stepButton = document.getElementById("stepbutton");
		const stopButton = document.getElementById("stopbutton");
		
		launchButton.addEventListener("click", () => this.performLaunch());
		stepButton.addEventListener("click", () => this.performStep());
		stopButton.addEventListener("click", () => this.performStop());
	}
	
	private showMessage(message: string): void {
		// TODO: Use a custom status bar instead?
		alert(message);
	}
	
	private performLaunch(): void {
		const program = this.model.getFileState().getProgram();
		if (program == null) {
			this.showMessage("No program present!");
		} else {
			const previousExecutor = this.model.getExecutor();
			if (previousExecutor != null) {
				previousExecutor.halt();
			}
			
			const executor = new AssemblyExecutor({
				instructionDelay: 50,
				messageHandler: msg => this.showMessage(msg),
				program: program,
				state: this.model.getProcessorState()
			});
			window.setTimeout(() => executor.run(), 100);
			this.model.setExecutor(executor);
		}
	}
	
	private performStep(): void {
		// TODO
	}
	
	private performStop(): void {
		const executor = this.model.getExecutor();
		
		if (executor == null) {
			this.showMessage("No program is currently running!");
		} else {
			executor.halt();
		}
	}
}

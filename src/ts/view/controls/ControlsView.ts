import { AppModel } from "../../model/AppModel";
import { AssemblyExecutor } from "../../model/processor/AssemblyExecutor";

export class ControlsView {
	private model: AppModel;
	
	public constructor(model: AppModel) {
		this.model = model;
		
		const runButton = document.getElementById("runbutton");
		const resumeButton = document.getElementById("resumebutton");
		const stepButton = document.getElementById("stepbutton");
		const stopButton = document.getElementById("stopbutton");
		const highlightLineCheckBox = document.getElementById("highlightlinecheck") as HTMLInputElement;
		
		runButton.addEventListener("click", () => this.performRun());
		resumeButton.addEventListener("click", () => this.performResume());
		stepButton.addEventListener("click", () => this.performStep());
		stopButton.addEventListener("click", () => this.performStop());
		highlightLineCheckBox.addEventListener("change", () => this.setLineHighlighting(highlightLineCheckBox.checked));
	}
	
	private showMessage(message: string): void {
		// TODO: Use a custom status bar instead?
		alert(message);
	}
	
	private performRun(): void {
		this.setupNewExecutor();
		this.withExecutor(exec => window.setTimeout(() => exec.run(), 100));
	}
	
	private performResume(): void {
		this.withExecutor(exec => exec.resume());
	}
	
	private performStep(): void {
		this.withExecutor(exec => exec.step());
	}
	
	private performStop(): void {
		this.withExecutor(exec => exec.stop());
		this.model.setExecutor(null);
	}
	
	private withExecutor(task: (exec: AssemblyExecutor) => void): void {
		const executor = this.model.getExecutor();
		if (executor == null || executor.isStopped()) {
			this.setupNewExecutor();
		}
		task(this.model.getExecutor());
	}
	
	private setupNewExecutor(): void {
		const program = this.model.getFileState().getProgram();
		if (program == null) {
			this.showMessage("No program present!");
		} else {
			const previousExecutor = this.model.getExecutor();
			if (previousExecutor != null) {
				previousExecutor.halt();
			}
			
			const executor = new AssemblyExecutor({
				instructionDelay: 40,
				messageHandler: msg => this.showMessage(msg),
				program: program,
				state: this.model.getProcessorState()
			});
			this.model.setExecutor(executor);
		}
	}
	
	private setLineHighlighting(highlightLines: boolean): void {
		this.model.getSettings().setHighlightLines(highlightLines);
	}
}

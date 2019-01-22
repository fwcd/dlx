import { AppModel } from "../../model/AppModel";
import { AssemblyExecutor } from "../../model/processor/AssemblyExecutor";

const PAUSE_LABEL = "Pause";
const RESUME_LABEL = "Resume";

export class ControlsView {
	private model: AppModel;
	private runButton: HTMLElement;
	private pauseButton: HTMLElement;
	private stepButton: HTMLElement;
	private stopButton: HTMLElement;
	private pausedListener: (p: boolean) => void = paused => this.updatePauseLabel(paused);
	
	public constructor(model: AppModel) {
		this.model = model;
		
		this.runButton = document.getElementById("runbutton");
		this.pauseButton = document.getElementById("pausebutton");
		this.stepButton = document.getElementById("stepbutton");
		this.stopButton = document.getElementById("stopbutton");
		const highlightLineCheckBox = document.getElementById("highlightlinecheck") as HTMLInputElement;
		this.updatePauseLabel(false);
		
		this.runButton.addEventListener("click", () => this.performRun());
		this.pauseButton.addEventListener("click", () => this.performPause());
		this.stepButton.addEventListener("click", () => this.performStep());
		this.stopButton.addEventListener("click", () => this.performStop());
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
	
	private performPause(): void {
		this.withExecutor(exec => {
			if (exec.isHalted()) {
				exec.resume();
			} else {
				exec.pause();
			}
		});
	}
	
	private updatePauseLabel(paused: boolean): void {
		this.pauseButton.innerText = (paused ? RESUME_LABEL : PAUSE_LABEL);
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
		const program = this.model.getParsedProgram().getProgram();
		if (program == null) {
			this.showMessage("No program present!");
		} else {
			const previousExecutor = this.model.getExecutor();
			if (previousExecutor != null) {
				previousExecutor.pause();
				previousExecutor.removePausedListener(this.pausedListener);
			}
			
			const executor = new AssemblyExecutor({
				instructionDelay: 40,
				messageHandler: msg => this.showMessage(msg),
				program: program,
				state: this.model.getProcessorState()
			});
			executor.addPausedListener(this.pausedListener);
			this.model.setExecutor(executor);
		}
	}
	
	private setLineHighlighting(highlightLines: boolean): void {
		this.model.getSettings().setHighlightLines(highlightLines);
	}
}

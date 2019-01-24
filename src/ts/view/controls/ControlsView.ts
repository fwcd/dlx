import { AppModel } from "../../model/AppModel";
import { AssemblyExecutor } from "../../model/processor/AssemblyExecutor";
import { OverlayView } from "../overlay/OverlayView";
import { SettingsView } from "../overlay/SettingsView";
import { Listener } from "../../model/utils/ListenerList";

const PAUSE_LABEL = "Pause";
const RESUME_LABEL = "Resume";

export class ControlsView {
	private model: AppModel;
	private runButton: HTMLElement;
	private pauseButton: HTMLElement;
	private stepButton: HTMLElement;
	private stopButton: HTMLElement;
	private settingsButton: HTMLElement;
	
	private pausedListener: Listener<boolean> = paused => this.updatePauseLabel(paused);
	
	public constructor(model: AppModel, overlay: OverlayView) {
		this.model = model;
		
		this.runButton = document.getElementById("runbutton");
		this.pauseButton = document.getElementById("pausebutton");
		this.stepButton = document.getElementById("stepbutton");
		this.stopButton = document.getElementById("stopbutton");
		this.settingsButton = document.getElementById("settingsbutton");
		this.updatePauseLabel(false);
		
		this.runButton.addEventListener("click", () => this.performRun());
		this.pauseButton.addEventListener("click", () => this.performPause());
		this.stepButton.addEventListener("click", () => this.performStep());
		this.stopButton.addEventListener("click", () => this.performStop());
		this.settingsButton.addEventListener("click", () => overlay.show(new SettingsView(model.getSettings()).getElement()));
	}
	
	private showMessage(message: string): void {
		// TODO: Use a custom status bar instead?
		alert(message);
	}
	
	public performRun(): void {
		this.withExecutor(exec => window.setTimeout(() => exec.run(), 100), /* shouldSetupNewExecutor */ true);
	}
	
	public performPause(): void {
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
	
	public performStep(): void {
		this.withExecutor(exec => exec.step());
	}
	
	public performStop(): void {
		this.withExecutor(exec => exec.stop());
		this.model.setExecutor(null);
	}
	
	private withExecutor(task: (exec: AssemblyExecutor) => void, shouldSetupNewExecutor?: boolean): void {
		const executor = this.model.getExecutor();
		if (executor == null || executor.isStopped() || (shouldSetupNewExecutor != null && shouldSetupNewExecutor)) {
			this.setupNewExecutor();
		}
		task(this.model.getExecutor());
	}
	
	private setupNewExecutor(): void {
		const program = this.model.getParsedProgram();
		if (program == null || program.getProgram() == null) {
			this.showMessage("No program present!");
		} else {
			const previousExecutor = this.model.getExecutor();
			if (previousExecutor != null) {
				previousExecutor.pause();
				previousExecutor.removePausedListener(this.pausedListener);
			}
			
			const executor = new AssemblyExecutor({
				instructionDelay: this.model.getSettings().getInstructionDelay(),
				messageHandler: msg => this.showMessage(msg),
				program: program.getProgram(),
				state: this.model.getProcessorState(),
				breakpoints: program.getBreakpointManager()
			});
			executor.addPausedListener(this.pausedListener);
			this.model.setExecutor(executor);
		}
	}
}

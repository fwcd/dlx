import { ProcessorState } from "./processor/ProcessorState";
import { FileStateModel } from "./file/FileStateModel";
import { AssemblyExecutor } from "./processor/AssemblyExecutor";
import { SettingsModel } from "./SettingsModel";
import { ListenerList, Listener } from "./utils/ListenerList";

/**
 * Encapsulates GUI-independent state of the application.
 */
export class AppModel {
	private processorState = new ProcessorState();
	private fileState = new FileStateModel();
	private executor?: AssemblyExecutor = null;
	private settings = new SettingsModel();
	
	private executorListeners = new ListenerList<AssemblyExecutor>();
	
	public getProcessorState(): ProcessorState { return this.processorState; }
	
	public getFileState(): FileStateModel { return this.fileState; }
	
	public setExecutor(executor: AssemblyExecutor): void {
		this.executor = executor;
		this.executorListeners.fire(executor);
	}
	
	public getExecutor(): AssemblyExecutor | null { return this.executor; }
	
	public getSettings(): SettingsModel { return this.settings; }
	
	public addExecutorListener(listener: Listener<AssemblyExecutor>): void {
		this.executorListeners.add(listener);
		if (this.executor) {
			listener(this.executor);
		}
	}
	
	public removeExecutorListener(listener: Listener<AssemblyExecutor>): void { this.executorListeners.remove(listener); }
}

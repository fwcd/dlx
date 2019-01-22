import { ProcessorState } from "./processor/ProcessorState";
import { ParsedProgram } from "./ParsedProgram";
import { AssemblyExecutor } from "./processor/AssemblyExecutor";
import { SettingsModel } from "./SettingsModel";
import { ListenerList, Listener } from "./utils/ListenerList";
import { FileLoaderModel } from "./FileLoaderModel";

/**
 * Encapsulates GUI-independent state of the application.
 */
export class AppModel {
	private processorState = new ProcessorState();
	private parsedProgram = new ParsedProgram();
	private executor?: AssemblyExecutor = null;
	private settings = new SettingsModel();
	private fileLoader = new FileLoaderModel();
	
	private executorListeners = new ListenerList<AssemblyExecutor>();
	
	public getProcessorState(): ProcessorState { return this.processorState; }
	
	public getParsedProgram(): ParsedProgram { return this.parsedProgram; }
	
	public getFileLoader(): FileLoaderModel { return this.fileLoader; }
	
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

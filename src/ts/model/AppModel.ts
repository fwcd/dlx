import { ProcessorState } from "./processor/ProcessorState";
import { FileStateModel } from "./file/FileStateModel";
import { AssemblyExecutor } from "./processor/AssemblyExecutor";

/**
 * The abstract application state.
 */
export class AppModel {
	private processorState = new ProcessorState();
	private fileState = new FileStateModel();
	private executor?: AssemblyExecutor = null;
	
	public getProcessorState(): ProcessorState {
		return this.processorState;
	}
	
	public getFileState(): FileStateModel {
		return this.fileState;
	}
	
	public setExecutor(executor: AssemblyExecutor): void {
		this.executor = executor;
	}
	
	public getExecutor(): AssemblyExecutor | null {
		return this.executor;
	}
}

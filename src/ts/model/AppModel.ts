import { ProcessorState } from "./processor/ProcessorState";
import { FileStateModel } from "./file/FileStateModel";

export class AppModel {
	private processorState = new ProcessorState();
	private fileState = new FileStateModel();
	
	public getProcessorState(): ProcessorState {
		return this.processorState;
	}
	
	public getFileState(): FileStateModel {
		return this.fileState;
	}
}

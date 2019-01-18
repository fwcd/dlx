import { ProcessorStorage } from "./ProcessorStorage";

export class ProcessorState {
	private storage = new ProcessorStorage();
	
	public getStorage(): ProcessorStorage {
		return this.storage;
	}
}

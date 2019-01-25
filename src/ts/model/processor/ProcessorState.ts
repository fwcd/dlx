import { ProcessorStorage } from "./ProcessorStorage";
import { SettingsModel } from "../SettingsModel";

/**
 * The state of the processor including various
 * storage facilities.
 */
export class ProcessorState {
	private storage = new ProcessorStorage(32, 1024, 1000);
	
	public constructor(settings: SettingsModel) {
		settings.addRegisterCountListener(count => this.storage.resizeRegisters(count));
		settings.addMemorySizeListener(bytes => this.storage.resizeMemory(bytes));
		settings.addMemoryStartAddressListener(address => this.storage.setMemoryStartAddress(address));
	}
	
	public getStorage(): ProcessorStorage {
		return this.storage;
	}
}

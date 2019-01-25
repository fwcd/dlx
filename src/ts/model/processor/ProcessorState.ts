import { ProcessorStorage } from "./ProcessorStorage";
import { SettingsModel } from "../SettingsModel";
import { CALLER_ID_GENERATOR } from "../utils/NumberIdGenerator";

const PROCESSOR_STATE_CALLER_ID = CALLER_ID_GENERATOR.nextID();

/**
 * The state of the processor including various
 * storage facilities.
 */
export class ProcessorState {
	private storage = new ProcessorStorage(32, 1024, 1000);
	
	public constructor(settings: SettingsModel) {
		settings.addRegisterCountListener(count => this.storage.resizeRegisters(count), PROCESSOR_STATE_CALLER_ID);
		settings.addMemorySizeListener(bytes => this.storage.resizeMemory(bytes), PROCESSOR_STATE_CALLER_ID);
		settings.addMemoryStartAddressListener(address => this.storage.setMemoryStartAddress(address), PROCESSOR_STATE_CALLER_ID);
	}
	
	public getStorage(): ProcessorStorage {
		return this.storage;
	}
}

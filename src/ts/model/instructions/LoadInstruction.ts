import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";
import { ProcessorStorage } from "../ProcessorStorage";

/**
 * Loads from memory to a register.
 */
export class LoadInstruction implements Instruction {
	private getter: (storage: ProcessorStorage, address: number) => number;
	
	public constructor(getter: (storage: ProcessorStorage, address: number) => number) {
		this.getter = getter;
	}
	
	public execute(state: ProcessorState, ...args: number[]) {
		const storage = state.getStorage();
		const dest = args[0];
		const offset = args[1];
		const addressRegister = args[2];
		const address = offset + storage.getRegister(addressRegister);
		
		storage.setRegister(dest, this.getter(storage, address));
	}
}

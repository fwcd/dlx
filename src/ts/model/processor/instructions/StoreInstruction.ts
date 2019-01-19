import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";
import { ProcessorStorage } from "../ProcessorStorage";

/**
 * Stores a register in memory.
 */
export class StoreInstruction implements Instruction {
	private setter: (storage: ProcessorStorage, address: number, value: number) => void;
	
	public constructor(setter: (storage: ProcessorStorage) => number) {
		this.setter = setter;
	}
	
	public execute(state: ProcessorState, ...args: number[]) {
		const storage = state.getStorage();
		const offset = args[0];
		const addressRegister = args[1];
		const register = args[2];
		const address = offset + storage.getRegister(addressRegister);
		
		this.setter(storage, address, storage.getRegister(register));
	}
	
	public describe(): string {
		return "Stores the value of a register in memory.";
	}
}

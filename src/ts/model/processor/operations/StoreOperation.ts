import { Operation } from "./Operation";
import { ProcessorState } from "../ProcessorState";
import { ProcessorStorage } from "../ProcessorStorage";

/**
 * Stores a register in memory.
 */
export class StoreOperation implements Operation {
	private setter: (storage: ProcessorStorage, address: number, value: number) => void;
	
	public constructor(setter: (storage: ProcessorStorage) => number) {
		this.setter = setter;
	}
	
	public execute(state: ProcessorState, numericArgs: number[], labelArgs: string[]) {
		const storage = state.getStorage();
		const offset = numericArgs[0];
		const addressRegister = numericArgs[1];
		const register = numericArgs[2];
		const address = offset + storage.getRegister(addressRegister);
		
		this.setter(storage, address, storage.getRegister(register));
	}
	
	public describe(): string {
		return "Stores the value of a register in memory.";
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}

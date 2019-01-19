import { Operation } from "./Operation";
import { ProcessorState } from "../ProcessorState";
import { ProcessorStorage } from "../ProcessorStorage";

/**
 * Loads from memory to a register.
 */
export class LoadOperation implements Operation {
	private getter: (storage: ProcessorStorage, address: number) => number;
	
	public constructor(getter: (storage: ProcessorStorage, address: number) => number) {
		this.getter = getter;
	}
	
	public execute(state: ProcessorState, numericArgs: number[], labelArgs: string[]) {
		const storage = state.getStorage();
		const dest = numericArgs[0];
		const offset = numericArgs[1];
		const addressRegister = numericArgs[2];
		const address = offset + storage.getRegister(addressRegister);
		
		storage.setRegister(dest, this.getter(storage, address));
	}
	
	public describe(): string {
		return "Loads from memory to a register.";
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}

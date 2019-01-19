import { ProcessorStorage } from "../ProcessorStorage";
import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";

/**
 * Loads from memory to a register.
 */
export class LoadOperation implements Operation {
	private getter: (storage: ProcessorStorage, address: number) => number;
	
	public constructor(getter: (storage: ProcessorStorage, address: number) => number) {
		this.getter = getter;
	}
	
	public execute(params: OperationExecutionParams) {
		const storage = params.state.getStorage();
		const dest = params.numericArgs[0];
		const offset = params.numericArgs[1];
		const addressRegister = params.numericArgs[2];
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

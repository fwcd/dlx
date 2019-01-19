import { Operation } from "./Operation";
import { ProcessorStorage } from "../ProcessorStorage";
import { OperationExecutionParams } from "./OperationExecutionParams";

/**
 * Stores a register in memory.
 */
export class StoreOperation implements Operation {
	private setter: (storage: ProcessorStorage, address: number, value: number) => void;
	
	public constructor(setter: (storage: ProcessorStorage) => number) {
		this.setter = setter;
	}
	
	public execute(params: OperationExecutionParams) {
		const storage = params.state.getStorage();
		const offset = params.numericArgs[0];
		const addressRegister = params.numericArgs[1];
		const register = params.numericArgs[2];
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

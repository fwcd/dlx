import { Operation } from "./Operation";
import { ProcessorStorage } from "../ProcessorStorage";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Stores a register in memory.
 */
export class StoreOperation implements Operation {
	private argumentSyntax = /^ *(\d+) *\( *R(\d+) *\) *, *R(\d+) *$/;
	private setter: (storage: ProcessorStorage, address: number, value: number) => void;
	
	public constructor(setter: (storage: ProcessorStorage, address: number, value: number) => void) {
		this.setter = setter;
	}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const storage = params.state.getStorage();
		const offset = params.numericArgs[0];
		const addressRegister = params.numericArgs[1];
		const register = params.numericArgs[2];
		const address = offset + storage.getRegister(addressRegister);
		
		this.setter(storage, address, storage.getRegister(register));
		return {};
	}
	
	public describe(): string {
		return "Stores the value of a register in memory.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}

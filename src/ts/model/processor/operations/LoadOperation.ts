import { ProcessorStorage } from "../ProcessorStorage";
import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Loads from memory to a register.
 */
export class LoadOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *, *(\d+) *\( *R(\d+) *\) *$/;
	
	private getter: (storage: ProcessorStorage, address: number) => number;
	
	public constructor(getter: (storage: ProcessorStorage, address: number) => number) {
		this.getter = getter;
	}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const storage = params.state.getStorage();
		const dest = params.numericArgs[0];
		const memOffset = params.numericArgs[1];
		const addressRegister = params.numericArgs[2];
		const address = memOffset + storage.getRegister(addressRegister);
		
		storage.setRegister(dest, this.getter(storage, address));
		return {};
	}
	
	public describe(): string {
		return "Loads from memory to a register.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}

import { ProcessorState } from "../ProcessorState";
import { OperationExecutionParams } from "./OperationExecutionParams";

/**
 * A machine operation.
 */
export interface Operation {
	execute(params: OperationExecutionParams): void;
	
	getExpectedArgCount(): number;
	
	describe(): string;
}

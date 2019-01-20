import { ProcessorState } from "../ProcessorState";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * A machine operation.
 */
export interface Operation {
	execute(params: OperationExecutionParams): OperationResult;
	
	getExpectedArgCount(): number;
	
	describe(): string;
}

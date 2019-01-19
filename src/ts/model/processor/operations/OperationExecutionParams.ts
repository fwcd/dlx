import { ProcessorState } from "../ProcessorState";
import { ProgramCounter } from "../ProgramCounter";

export interface OperationExecutionParams {
	state: ProcessorState;
	counter: ProgramCounter;
	numericArgs: number[];
	labelArgs: string[];
}

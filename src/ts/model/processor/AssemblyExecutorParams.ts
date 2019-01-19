import { AssemblyProgram } from "./AssemblyProgram";
import { ProcessorState } from "./ProcessorState";

export interface AssemblyExecutorParams {
	program: AssemblyProgram;
	state: ProcessorState;
	instructionDelay?: number;
	messageHandler: (msg: string) => void;
}

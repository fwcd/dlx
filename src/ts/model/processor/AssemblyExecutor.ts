import { AssemblyProgram } from "./AssemblyProgram";
import { AssemblyExecutorParams } from "./AssemblyExecutorParams";
import { Instruction } from "./Instruction";
import { ProgramCounter } from "./ProgramCounter";
import { ProcessorState } from "./ProcessorState";

/**
 * A running assembly sequence/program.
 */
export class AssemblyExecutor {
	private program: AssemblyProgram;
	private state: ProcessorState;
	private counter = new ProgramCounter();
	private halted = false;
	private instructionDelay: number;
	private messageHandler: (msg: string) => void;
	
	public constructor(params: AssemblyExecutorParams, state: ProcessorState) {
		this.program = params.program;
		this.state = state;
		this.messageHandler = params.messageHandler;
		this.instructionDelay = this.instructionDelay || 0;
	}
	
	public run(): void {
		if (this.instructionDelay > 0) {
			this.execNextInstruction();
			window.setTimeout(() => this.run(), this.instructionDelay);
		} else {
			while (!this.halted) {
				this.execNextInstruction();
			}
		}
	}
	
	public execNextInstruction(): void {
		const instruction = this.getNextInstruction();
		instruction.operation.execute({
			counter: this.counter,
			state: this.state,
			labelArgs: instruction.labelArgs,
			numericArgs: instruction.numericArgs
		});
		this.counter.increment();
	}
	
	private getNextInstruction(): Instruction {
		return this.program.instructions[this.counter.getIndex()];
	}
}

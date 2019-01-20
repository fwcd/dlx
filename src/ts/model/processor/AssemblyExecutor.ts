import { AssemblyProgram } from "./AssemblyProgram";
import { AssemblyExecutorParams } from "./AssemblyExecutorParams";
import { Instruction } from "./Instruction";
import { ProgramCounter } from "./ProgramCounter";
import { ProcessorState } from "./ProcessorState";
import { ListenerList, Listener } from "../utils/ListenerList";

/**
 * A running assembly sequence/program.
 */
export class AssemblyExecutor {
	private program: AssemblyProgram;
	private state: ProcessorState;
	private counter: ProgramCounter;
	private halted = false;
	private stopped = false;
	private instructionDelay: number;
	
	private messageHandler: (msg: string) => void;
	private lineListeners = new ListenerList<number>();
	
	public constructor(params: AssemblyExecutorParams) {
		this.program = params.program;
		this.state = params.state;
		this.messageHandler = params.messageHandler;
		this.instructionDelay = params.instructionDelay || 0;
		this.counter = new ProgramCounter(params.program.labelIndices);
	}
	
	public run(): void {
		if (this.instructionDelay > 0 && !this.halted) {
			this.execNextInstruction();
			window.setTimeout(() => this.run(), this.instructionDelay);
		} else {
			while (!this.halted) {
				this.execNextInstruction();
			}
		}
	}
	
	public halt(): void {
		this.halted = true;
	}
	
	public stop(): void {
		this.halt();
		this.stopped = true;
		this.lineListeners.fire(-1);
	}
	
	public execNextInstruction(): void {
		const instruction = this.getNextInstruction();
		
		if (instruction == null) {
			this.messageHandler("Warning: No instruction found at program counter index " + this.counter.getIndex());
			this.halt();
		}
		
		this.validateInstruction(instruction);
		this.counter.resetJumpFlag();
		
		const result = instruction.operation.execute({
			counter: this.counter,
			state: this.state,
			labelArgs: instruction.labelArgs,
			numericArgs: instruction.numericArgs
		});
		
		if (!this.counter.didJump()) {
			this.counter.increment();
		}
		
		const reachedEnd = this.counter.getIndex() >= this.program.instructions.length;
		const shouldHalt = (result.shouldHalt == null) ? false : result.shouldHalt;
		
		if (shouldHalt) {
			this.halt();
		}
		
		if (reachedEnd) {
			this.stop();
		}
		
		const nextInstruction = this.getNextInstruction();
		if (nextInstruction != null) {
			this.lineListeners.fire(nextInstruction.asmCodeLine);
		}
	}
	
	private validateInstruction(instruction: Instruction): void {
		instruction.labelArgs.forEach(arg => {
			if (arg == null) {
				this.messageHandler("Warning: Found label argument " + arg + " in instruction " + instruction);
			}
		});
		instruction.numericArgs.forEach(arg => {
			if (arg == null) {
				this.messageHandler("Warning: Found numeric argument " + arg + " in instruction " + instruction);
			}
		});
	}
	
	public getProgramCounter(): ProgramCounter {
		return this.counter;
	}
	
	private getNextInstruction(): Instruction {
		return this.program.instructions[this.counter.getIndex()];
	}
	
	public isHalted(): boolean {
		return this.halted;
	}
	
	public isStopped(): boolean {
		return this.stopped;
	}
	
	public resume(): void {
		this.halted = false;
		this.run();
	}
	
	public step(): void {
		this.execNextInstruction();
	}
	
	public addLineListener(listener: Listener<number>): void {
		this.lineListeners.add(listener);
		const instruction = this.getNextInstruction();
		if (instruction != null) {
			listener(instruction.asmCodeLine);
		}
	}
	
	public removeLineListener(listener: Listener<number>): void {
		this.lineListeners.remove(listener);
	}
}

import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs a jump to a position in a register
 * storing the next program counter.
 */
export class JumpAndLinkRegisterOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *$/;
	
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const register = params.numericArgs[0];
		const npc = params.counter.getIndex() + 1;
		
		params.state.getStorage().setRegister(31, npc);
		params.counter.jumpTo(params.state.getStorage().getRegister(register));
		
		return {};
	}
	
	public describe(): string {
		return "Jumps to a position in a register and stores the NPC in R31.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 1;
	}
}

import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs a jump storing the next program counter.
 */
export class JumpAndLinkOperation implements Operation {
	private argumentSyntax = /^ *(\w+) *$/;
	
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const npc = params.counter.getIndex() + 1;
		params.state.getStorage().setRegister(31, npc);
		if (params.labelArgs.length > 0) {
			params.counter.jumpToLabel(params.labelArgs[0]);
		} else {
			params.counter.jumpTo(params.numericArgs[0]);
		}
		return {};
	}
	
	public describe(): string {
		return "Jumps and stores NPC in R31.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 1;
	}
}

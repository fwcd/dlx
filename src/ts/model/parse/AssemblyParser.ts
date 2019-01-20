import { AssemblyProgram } from "../processor/AssemblyProgram";
import { AssemblyDiagnostic } from "./AssemblyDiagnostic";
import { AssemblyDiagnosticSeverity } from "./AssemblyDiagnosticSeverity";
import { Instruction } from "../processor/Instruction";
import { ASM_LINE_REGEX, ASM_ARGUMENT_MATCH_REGEX, ASM_REGISTER_ARGUMENT_REGEX, ASM_LITERAL_ARGUMENT_REGEX, ASM_LABEL_REGEX } from "./AssemblyRegex";
import { OPCODES } from "../processor/operations/Opcodes";

type DiagnosticsHandler = (diags: AssemblyDiagnostic[]) => void;

interface ParsedInstruction extends Instruction {
	label?: string;
}

interface Indexed<T> {
	value: T;
	index: number;
}

interface ParsedArgs {
	numericArgs: number[];
	labelArgs: string[];
}

/**
 * Parses raw assembly code to an AssemblyProgram.
 */
export class AssemblyParser {
	private diagnosticsHandler: DiagnosticsHandler;
	
	public constructor(diagnosticsHandler: DiagnosticsHandler) {
		this.diagnosticsHandler = diagnosticsHandler;
	}
	
	public parse(asmLines: string[]): AssemblyProgram {
		const labelledInstructions = asmLines
			.map((line, i) => this.parseLine(line, i + 1))
			.filter(inst => inst != null);
			
		const labelIndices: { [label: string]: number; } = {};
		labelledInstructions
			.map((inst, i) => <Indexed<ParsedInstruction>> {
				value: inst,
				index: i
			})
			.filter(inst => inst.value.label)
			.forEach(inst => labelIndices[inst.value.label] = inst.index);
		
		return {
			instructions: labelledInstructions,
			labelIndices: labelIndices
		};
	}
	
	private parseLine(asmLine: string, lineIndex: number): ParsedInstruction | null {
		const match = ASM_LINE_REGEX.exec(asmLine);
		if (match == null) {
			return null;
		} else {
			let label = match[1];
			const opc = match[2].toUpperCase();
			const rawArgs = match[3];
			
			if (label === "") {
				label = undefined;
			}
			
			if (!(opc in OPCODES)) {
				const opcStartCol = asmLine.indexOf(opc) + 1;
				this.diagnosticsHandler([{
					line: lineIndex,
					code: asmLine,
					startColumn: opcStartCol,
					endColumn: opcStartCol + opc.length,
					severity: AssemblyDiagnosticSeverity.ERROR,
					message: "Invalid Opcode: " + opc
				}]);
				return null;
			}
			
			const operation = OPCODES[opc];
			const parsedArgs = this.parseArgs(rawArgs, operation.getExpectedArgCount(), asmLine, lineIndex);
			
			return <ParsedInstruction> {
				operation: operation,
				numericArgs: parsedArgs.numericArgs,
				labelArgs: parsedArgs.labelArgs,
				label: label,
				asmCodeLine: lineIndex
			};
		}
	}
	
	private parseArgs(rawArgs: string, expectedArgCount: number, asmLine: string, lineIndex: number): ParsedArgs {
		const splittedArgs = this.splitArgs(rawArgs, expectedArgCount, asmLine, lineIndex);
		const numericArgs: number[] = [];
		const labelArgs: string[] = [];
		
		if (splittedArgs != null) {
			splittedArgs.forEach(arg => {
				const label = ASM_LABEL_REGEX.exec(arg);
				const numeric = ASM_LITERAL_ARGUMENT_REGEX.exec(arg) || ASM_REGISTER_ARGUMENT_REGEX.exec(arg);
				if (numeric != null) {
					numericArgs.push(+(numeric[1]));
				} else if (label != null) {
					labelArgs.push(label[1]);
				} else {
					// Assume the argument is a label
					labelArgs.push(arg);
				}
			});
		}
		
		return {
			numericArgs: numericArgs,
			labelArgs: labelArgs
		};
	}
	
	private splitArgs(rawArgs: string, expectedArgCount: number, asmLine: string, lineIndex: number): string[] {
		if (rawArgs == null) {
			this.diagnosticsHandler([{
				line: lineIndex,
				code: asmLine,
				startColumn: 1,
				endColumn: asmLine.length + 1,
				severity: AssemblyDiagnosticSeverity.WARNING,
				message: "Missing args"
			}]);
			return null;
		}
		const matches = rawArgs.match(ASM_ARGUMENT_MATCH_REGEX) || [];
		
		if (matches.length !== expectedArgCount) {
			const argsStartCol = asmLine.indexOf(rawArgs) + 1;
			this.diagnosticsHandler([{
				line: lineIndex,
				code: asmLine,
				startColumn: argsStartCol,
				endColumn: argsStartCol + rawArgs.length,
				severity: AssemblyDiagnosticSeverity.WARNING,
				message: "Expected " + expectedArgCount + " args, but got " + matches.length + ", Matched: " + rawArgs + " to " + matches
			}]);
		}
		
		return matches;
	}
}

import { AssemblyProgram } from "../processor/AssemblyProgram";
import { AssemblyDiagnostic } from "./AssemblyDiagnostic";
import { AssemblyDiagnosticSeverity } from "./AssemblyDiagnosticSeverity";

export class AssemblyParser {
	public parse(asmLines: string[], diagnosticsHandler: (diags: AssemblyDiagnostic[]) => void): AssemblyProgram {
		// TODO
		return new AssemblyProgram();
	}
}

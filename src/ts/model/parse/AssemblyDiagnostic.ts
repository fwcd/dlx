import { AssemblyDiagnosticSeverity } from "./AssemblyDiagnosticSeverity";

export interface AssemblyDiagnostic {
	message: string;
	severity: AssemblyDiagnosticSeverity;
	line: number;
	startColumn: number;
	endColumn: number;
	code?: string;
}

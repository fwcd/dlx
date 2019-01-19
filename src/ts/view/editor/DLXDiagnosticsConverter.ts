/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { AssemblyDiagnostic } from "../../model/parse/AssemblyDiagnostic";
import { AssemblyDiagnosticSeverity } from "../../model/parse/AssemblyDiagnosticSeverity";

function toMonacoSeverity(asmSeverity: AssemblyDiagnosticSeverity): monaco.MarkerSeverity {
	switch (asmSeverity) {
		case AssemblyDiagnosticSeverity.ERROR: return monaco.MarkerSeverity.Error;
		case AssemblyDiagnosticSeverity.WARNING: return monaco.MarkerSeverity.Warning;
		case AssemblyDiagnosticSeverity.INFO: return monaco.MarkerSeverity.Info;
		case AssemblyDiagnosticSeverity.HINT: return monaco.MarkerSeverity.Hint;
		default: throw new Error("Invalid diagnostic severity: " + asmSeverity);
	}
}

export function diagnosticsToMarkers(asmDiags: AssemblyDiagnostic[]): monaco.editor.IMarkerData[] {
	return asmDiags.map(diag => <monaco.editor.IMarkerData> {
		message: diag.message,
		severity: toMonacoSeverity(diag.severity),
		startLineNumber: diag.line,
		endLineNumber: diag.line,
		startColumn: diag.startColumn,
		endColumn: diag.endColumn,
		code: diag.code
	});
}

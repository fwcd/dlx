import { AssemblyProgram } from "../processor/AssemblyProgram";
import { AssemblyParser } from "../parse/AssemblyParser";
import { ListenerList, Listener } from "../utils/ListenerList";
import { AssemblyDiagnostic } from "../parse/AssemblyDiagnostic";

export class FileStateModel {
	private parser = new AssemblyParser();
	private program?: AssemblyProgram;
	private diagnostics: AssemblyDiagnostic[] = [];
	
	private diagnosticsListeners = new ListenerList<AssemblyDiagnostic[]>();
	private programListeners = new ListenerList<AssemblyProgram>();
	
	public setText(lines: string[]): void {
		this.program = this.parser.parse(lines, diags => this.diagnostics = diags);
		this.diagnosticsListeners.fire(this.diagnostics);
		this.programListeners.fire(this.program);
	}
	
	public addProgramListener(listener: Listener<AssemblyProgram>): void { this.programListeners.add(listener); }
	
	public removeProgramListener(listener: Listener<AssemblyProgram>): void { this.programListeners.remove(listener); }
	
	public addDiagnosticsListener(listener: Listener<AssemblyDiagnostic[]>): void { this.diagnosticsListeners.add(listener); }
	
	public removeDiagnosticsListener(listener: Listener<AssemblyDiagnostic[]>): void { this.diagnosticsListeners.remove(listener); }
}

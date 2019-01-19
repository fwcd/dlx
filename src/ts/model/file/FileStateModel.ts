import { AssemblyProgram } from "../processor/AssemblyProgram";
import { AssemblyParser } from "../parse/AssemblyParser";
import { ListenerList, Listener } from "../utils/ListenerList";
import { AssemblyDiagnostic } from "../parse/AssemblyDiagnostic";
import { Debouncer } from "../utils/Debouncer";

export class FileStateModel {
	private parser: AssemblyParser;
	private program?: AssemblyProgram = null;
	private diagnostics: AssemblyDiagnostic[] = [];
	private diagnosticsDebouncer = new Debouncer(250);
	
	private diagnosticsListeners = new ListenerList<AssemblyDiagnostic[]>();
	private programListeners = new ListenerList<AssemblyProgram>();
	
	public constructor() {
		this.parser = new AssemblyParser(diags => diags.forEach(it => this.diagnostics.push(it)));
	}
	
	public setText(lines: string[]): void {
		this.diagnostics = [];
		this.program = this.parser.parse(lines);
		this.diagnosticsDebouncer.run(() => this.diagnosticsListeners.fire(this.diagnostics));
		this.programListeners.fire(this.program);
	}
	
	public addProgramListener(listener: Listener<AssemblyProgram>): void { this.programListeners.add(listener); }
	
	public removeProgramListener(listener: Listener<AssemblyProgram>): void { this.programListeners.remove(listener); }
	
	public addDiagnosticsListener(listener: Listener<AssemblyDiagnostic[]>): void { this.diagnosticsListeners.add(listener); }
	
	public removeDiagnosticsListener(listener: Listener<AssemblyDiagnostic[]>): void { this.diagnosticsListeners.remove(listener); }
	
	public getProgram(): AssemblyProgram | null {
		return this.program;
	}
}

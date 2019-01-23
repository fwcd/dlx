/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { BreakpointManager } from "../../model/debugger/BreakpointManager";
import { LineBreakpoint } from "../../model/debugger/LineBreakpoint";

export class BreakpointsView {
	private editor: monaco.editor.IStandaloneCodeEditor;
	private model: BreakpointManager;
	private decorationIds: string[] = [];
	
	public constructor(model: BreakpointManager, editor: monaco.editor.IStandaloneCodeEditor) {
		this.model = model;
		this.editor = editor;
		
		this.model.addBreakpointListener(bps => this.updateView(bps));
	}
	
	public onMouseDown(lineNumber: number): void {
		// The lineNumber is 1-indexed
		this.model.setBreakpoint(lineNumber);
	}
	
	private updateView(breakpoints: LineBreakpoint[]): void {
		const newDecorations = breakpoints.map(bp => <monaco.editor.IModelDeltaDecoration> {
			range: {
				startColumn: 1,
				endColumn: 1,
				startLineNumber: bp.lineNumber,
				endLineNumber: bp.lineNumber
			},
			options: {
				glyphMarginClassName: "breakpoint",
				glyphMarginHoverMessage: {
					value: "Breakpoint" // TODO
				}
			}
		});
		this.decorationIds = this.editor.deltaDecorations(this.decorationIds, newDecorations);
	}
}

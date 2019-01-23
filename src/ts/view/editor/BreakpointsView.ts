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
		
		this.setupMouseListeners();
		this.model.addBreakpointListener(bps => this.updateView(bps));
	}
	
	private setupMouseListeners(): void {
		this.editor.onMouseDown(e => {
			const target = e.target.type;
			if (target == monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN
				|| target == monaco.editor.MouseTargetType.GUTTER_VIEW_ZONE
				|| target == monaco.editor.MouseTargetType.GUTTER_LINE_DECORATIONS) {
				this.onMouseDown(e.target.position.lineNumber);
			}
		});
	}
	
	public onMouseDown(lineNumber: number): void {
		// The lineNumber is 1-indexed
		this.model.toggleBreakpoint(lineNumber);
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
				className: "breakpoint",
				isWholeLine: false,
				glyphMarginClassName: "breakpoint"
			}
		});
		this.decorationIds = this.editor.deltaDecorations(this.decorationIds, newDecorations);
	}
}

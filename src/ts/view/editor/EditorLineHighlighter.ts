export class EditorLineHighlighter {
	private editor: monaco.editor.IStandaloneCodeEditor;
	private decorationIds: string[] = [];
	private decorationOptions: monaco.editor.IModelDecorationOptions = {
		isWholeLine: true,
		className: "editor-line-highlight"
	};
	
	public constructor(editor: monaco.editor.IStandaloneCodeEditor) {
		this.editor = editor;
	}
	
	public highlight(lineNumber: number): void {
		this.decorationIds = this.editor.deltaDecorations(
			this.decorationIds,
			[{
				range: {
					startColumn: 1,
					endColumn: 1,
					startLineNumber: lineNumber,
					endLineNumber: lineNumber
				},
				options: this.decorationOptions
			}]
		);
	}
	
	public removeHighlightings(): void {
		this.decorationIds = this.editor.deltaDecorations(
			this.decorationIds,
			[]
		);
	}
}

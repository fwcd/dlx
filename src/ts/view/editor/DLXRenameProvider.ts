/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

export class DLXRenameProvider implements monaco.languages.RenameProvider {
	public provideRenameEdits(model: monaco.editor.ITextModel, position: monaco.Position, newName: string): monaco.languages.WorkspaceEdit & monaco.languages.Rejection {
		const word = model.getWordAtPosition(position).word;
		const matches = model.findMatches(word, true, false, true, "[\\s:]", true);
		
		if (matches.length == 0) {
			return <monaco.languages.Rejection> {
				rejectReason: "No definition found for " + word
			};
		} else {
			return <monaco.languages.WorkspaceEdit> {
				edits: [{
					resource: model.uri,
					edits: matches.map(match => <monaco.languages.TextEdit> {
						range: match.range,
						text: newName
					})
				}]
			};
		}
	}
}

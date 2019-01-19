/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

export class DLXDefinitionProvider implements monaco.languages.DefinitionProvider {
	public provideDefinition(model: monaco.editor.ITextModel, position: monaco.Position): monaco.languages.Definition {
		const word = model.getWordAtPosition(position);
		
		if (word == null) {
			return [];
		} else {
			const matches = model.findMatches(word.word + ":", true, false, true, null, true);
			return matches.map(match => <monaco.languages.Location> {
				range: match.range,
				uri: model.uri
			});
		}
	}
}

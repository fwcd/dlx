/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

export class DLXLanguageConfiguration implements monaco.languages.LanguageConfiguration {
	onEnterRules: monaco.languages.OnEnterRule[] = [
		{
			beforeText: /:\s+.*$/,
			action: {
				indentAction: monaco.languages.IndentAction.Indent
			}
		}
	]
}

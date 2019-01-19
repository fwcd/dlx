/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { OPCODES } from "../../model/instructions/Opcodes";

export const DLX_GRAMMAR = <monaco.languages.IMonarchLanguage> {
	keywords: Object.keys(OPCODES),
	tokenizer: {
		root: [
			[/[a-zA-Z_$][\w$]*/, { cases: {
				"@keywords": "keyword",
				"@default": "identifier"
			}}],
			{ include: '@whitespace' },
			[/\d+/, "number"]
		],
		whitespace: [
			[/\/.*/, "comment"]
		]
	},
	ignoreCase: true
};

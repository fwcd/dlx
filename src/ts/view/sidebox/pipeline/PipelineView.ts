// Source: https://github.com/eclipse/sprotty/blob/master/examples/circlegraph/src/standalone.ts
// Copyright (c) 2017-2018 TypeFox and others.
// Licensed under EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0

import { View } from "../../utils/View";
import { PipelineModel } from "../../../model/pipeline/PipelineModel";
import { SGraphSchema, SModelElementSchema, SNodeSchema, SEdgeSchema, LocalModelSource, TYPES, IActionDispatcher, SGraphFactory, ElementMove, MoveAction, SLabelSchema } from "sprotty/lib";
import createContainer from "./Diagram.config";

export class PipelineView implements View {
	private element = document.getElementById("pipelinebox");
	
	public constructor(model: PipelineModel) {
		const container = createContainer();
		
		// Initialize gmodel
		const node0 = { id: "node0", type: "node:rectangular", position: { x: 100, y: 100 }, size: { width: 80, height: 80 } };
		const graph: SGraphSchema = { id: "graph", type: "graph", children: [node0] };
		let count = 2;
		
		function addNode(): SModelElementSchema[] {
			const newNode: SNodeSchema = {
				id: "node" + count,
				type: "node:rectangular",
				position: {
					x: Math.random() * 1024,
					y: Math.random() * 768
				},
				size: {
					width: 80,
					height: 80
				},
				children: [
					<SLabelSchema> {
						id: "node" + count + "label",
						type: "label:text",
						position: {
							x: 10,
							y: 10
						},
						text: "Test"
					}
				]
			};
			const newEdge: SEdgeSchema = {
				id: "edge" + count,
				type: "edge:straight",
				sourceId: "node0",
				targetId: "node" + count++
			};
			return [newNode, newEdge];
		}

		for (let i = 0; i < 200; ++i) {
			const newElements = addNode();
			for (const e of newElements) {
				graph.children.splice(0, 0, e);
			}
		}
		
		// Run
		const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
		modelSource.setModel(graph);
		
		const dispatcher = container.get<IActionDispatcher>(TYPES.IActionDispatcher);
		const factory = container.get<SGraphFactory>(TYPES.IModelFactory);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

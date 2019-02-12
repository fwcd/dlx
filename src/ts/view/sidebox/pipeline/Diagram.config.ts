// Source: https://github.com/eclipse/sprotty/blob/master/examples/circlegraph/src/di.config.ts
// Copyright (c) 2017-2018 TypeFox and others.
// Licensed under EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0

import { ContainerModule, Container } from "inversify";
import { configureModelElement, ConsoleLogger, LocalModelSource, RectangularNode, SGraph, SGraphView, TYPES, RectangularNodeView, PolylineEdgeView, configureViewerOptions, SEdge, defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule, exportModule } from "sprotty/lib";

export default () => {
	const graphModule = new ContainerModule((bind, unbind, isBound, rebind) => {
		bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
		rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
		const context = { bind, unbind, isBound, rebind };
		configureModelElement(context, "graph", SGraph, SGraphView);
		configureModelElement(context, "node:rectangular", RectangularNode, RectangularNodeView);
		configureModelElement(context, "edge:straight", SEdge, PolylineEdgeView);
	});
	const container = new Container();
	container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule, exportModule, graphModule);
	return container;
};

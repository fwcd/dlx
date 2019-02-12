import { View } from "../../utils/View";
import { PipelineModel } from "../../../model/pipeline/PipelineModel";

export class PipelineView implements View {
	private element = document.getElementById("pipelinebox");
	
	public constructor(model: PipelineModel) {
		
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}

import { ProcessorState } from "./ProcessorState";

export class AppModel {
	private state = new ProcessorState();
	
	public getState(): ProcessorState {
		return this.state;
	}
}

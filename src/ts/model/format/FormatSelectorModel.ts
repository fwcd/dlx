import { DataFormat } from "./DataFormat";
import { DecimalFormat } from "./DecimalFormat";
import { ListenerList, Listener } from "../utils/ListenerList";

export class FormatSelectorModel {
	private format: DataFormat = new DecimalFormat();
	private formatListeners = new ListenerList<DataFormat>();
	
	public getFormat(): DataFormat {
		return this.format;
	}
	
	public setFormat(format: DataFormat, callerID?: number): void {
		this.format = format;
		this.formatListeners.fire(format, callerID);
	}
	
	public addFormatListener(listener: Listener<DataFormat>, callerID?: number): void {
		this.formatListeners.add(listener, callerID);
		listener(this.format);
	}
	
	public removeFormatListener(listener: Listener<DataFormat>): void {
		this.formatListeners.remove(listener);
	}
}

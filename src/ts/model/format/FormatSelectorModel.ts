import { DataFormat } from "./DataFormat";
import { DecimalFormat } from "./DecimalFormat";
import { ListenerList, Listener } from "../utils/ListenerList";

export class FormatSelectorModel {
	private format: DataFormat = new DecimalFormat();
	private formatListeners = new ListenerList<DataFormat>();
	
	public getFormat(): DataFormat {
		return this.format;
	}
	
	public setFormat(format: DataFormat): void {
		this.format = format;
		this.formatListeners.fire(format);
	}
	
	public addFormatListener(listener: Listener<DataFormat>): void {
		this.formatListeners.add(listener);
		listener(this.format);
	}
	
	public removeFormatListener(listener: Listener<DataFormat>): void {
		this.formatListeners.remove(listener);
	}
}

export type Listener<T> = (value: T) => void;

interface ListenerWithCaller<T> {
	listener: Listener<T>;
	callerID?: number;
}

/**
 * An array of listeners that can conveniently
 * be "fired". Each listener operates by performing
 * some side-effect on the new value.
 */
export class ListenerList<T> {
	private listeners: ListenerWithCaller<T>[] = [];
	
	public add(listener: Listener<T>, callerID?: number): void {
		this.listeners.push({
			listener: listener,
			callerID: callerID
		});
	}
	
	public removeByID(callerID: number): void {
		const count = this.listeners.length;
		for (let i = (count - 1); i >= 0; i--) {
			const listener = this.listeners[i];
			if (callerID === listener.callerID) {
				this.listeners.splice(i, 1);
			}
		}
	}
	
	public remove(listenerToBeRemoved: Listener<T>): void {
		const count = this.listeners.length;
		for (let i = 0; i < count; i++) {
			const listener = this.listeners[i];
			if (listener.listener === listenerToBeRemoved) {
				this.listeners.splice(i, 1);
				return;
			}
		}
	}
	
	public fire(value: T, callerID?: number): void {
		this.listeners.forEach(it => {
			if (it.callerID == null || it.callerID !== callerID) {
				it.listener(value);
			}
		});
	}
}

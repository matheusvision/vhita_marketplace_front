/* eslint-disable */

class EventEmitter {
	events;

	constructor() {
		this.events = {};
	}

	_getEventListByName(eventName: string) {
		if (typeof this.events[eventName] === 'undefined') {
			this.events[eventName] = new Set();
		}
		return this.events[eventName];
	}

	on(eventName, fn) {
		this._getEventListByName(eventName).add(fn);
	}

	once(eventName: string, fn: () => void) {
		const onceFn = (...args) => {
			this.removeListener(eventName, onceFn);
			fn.apply(this, args);
		};
		this.on(eventName, onceFn);
	}

	emit(eventName: string, ...args) {
		this._getEventListByName(eventName).forEach(
			// eslint-disable-next-line func-names
			(fn) => {
				fn.apply(this, args);
			}
		);
	}

	removeListener(eventName, fn) {
		this._getEventListByName(eventName).delete(fn);
	}
}

export default EventEmitter;

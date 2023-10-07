/* eslint-disable */

/**
 * The EventEmitter class is a custom implementation of an event emitter.
 * It provides methods for registering and emitting events.
 */
class EventEmitter {
	events;

	constructor() {
		this.events = {};
	}

	/**
     * The _getEventListByName method returns the event list for a given event name.
     * If the event list does not exist, it creates a new one.
     *
     * @param eventName - The name of the event.
     * @returns The event list for the given event name.
     */
	_getEventListByName(eventName: string) {
		if (typeof this.events[eventName] === 'undefined') {
			this.events[eventName] = new Set();
		}
		return this.events[eventName];
	}

	 /**
     * The on method registers a callback function for a given event name.
     *
     * @param eventName - The name of the event.
     * @param fn - The callback function to register.
     */
	on(eventName, fn) {
		this._getEventListByName(eventName).add(fn);
	}

	/**
     * The once method registers a callback function for a given event name that will only be called once.
     *
     * @param eventName - The name of the event.
     * @param fn - The callback function to register.
     */
	once(eventName: string, fn: () => void) {
		const onceFn = (...args) => {
			this.removeListener(eventName, onceFn);
			fn.apply(this, args);
		};
		this.on(eventName, onceFn);
	}

	/**
     * The emit method triggers all registered callback functions for a given event name.
     *
     * @param eventName - The name of the event.
     * @param args - The arguments to pass to the callback functions.
     */
	emit(eventName: string, ...args) {
		this._getEventListByName(eventName).forEach(
			// eslint-disable-next-line func-names
			(fn) => {
				fn.apply(this, args);
			}
		);
	}

	/**
     * The removeListener method removes a registered callback function for a given event name.
     *
     * @param eventName - The name of the event.
     * @param fn - The callback function to remove.
     */
	removeListener(eventName, fn) {
		this._getEventListByName(eventName).delete(fn);
	}
}

export default EventEmitter;

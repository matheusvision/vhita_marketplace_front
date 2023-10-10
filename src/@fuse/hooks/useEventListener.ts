import { useEffect, useRef } from 'react';

/**
 * The useEventListener function is a custom hook that adds an event listener to an element.
 * It takes in an event name, a handler function, and an optional element as parameters.
 * It returns nothing.
 */
function useEventListener<T extends Event>(
	eventName: string,
	handler: (event: T) => void,
	element: HTMLElement | Window = window
) {
	// Create a ref that stores handler
	const savedHandler = useRef<(event: T) => void | null>(null);

	// Update ref.current value if handler changes.
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		// Create event listener that calls handler function stored in ref
		const eventListener = (event: T) => savedHandler.current?.(event);

		// Add event listener
		element.addEventListener(eventName, eventListener);

		// Clean up event listener on component unmount
		return () => {
			element.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}

export default useEventListener;

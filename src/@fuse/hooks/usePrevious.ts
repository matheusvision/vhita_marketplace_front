import { useEffect, useRef } from 'react';

/**
 * The usePrevious function is a custom hook that returns the previous value of a variable.
 * It takes in a value as a parameter and returns the previous value.
 *
 * @param value - The current value to store.
 * @returns The previous value of the variable.
 */
function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T | undefined>();

	// Store current value in ref
	useEffect(() => {
		ref.current = value;
	}, [value]);

	// Return previous value (happens before update in useEffect above)
	return ref.current;
}

export default usePrevious;

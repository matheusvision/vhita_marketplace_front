import _ from '@lodash';
import { DebounceSettings } from 'lodash';
import { useRef } from 'react';

/**
 * The useDebounce hook returns a debounced version of the provided function.
 * It uses the Lodash debounce function to create the debounced function.
 * The debounced function is memoized using the useRef hook to prevent unnecessary re-renders.
 * The hook takes in the original function, the wait time, and the debounce options as parameters.
 * The hook returns the debounced function.
 */
function useDebounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number | undefined,
	options?: DebounceSettings
): T {
	const debouncedFunc = useRef(_.debounce(func, wait, options) as unknown as T);
	return debouncedFunc.current;
}

export default useDebounce;

import _ from '@lodash';
import { DebounceSettings } from 'lodash';
import { useRef } from 'react';

function useDebounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number | undefined,
	options?: DebounceSettings
): T {
	const debouncedFunc = useRef(_.debounce(func, wait, options) as unknown as T);
	return debouncedFunc.current;
}

export default useDebounce;

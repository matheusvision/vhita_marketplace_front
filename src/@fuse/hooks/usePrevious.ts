import { useEffect, useRef } from 'react';

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

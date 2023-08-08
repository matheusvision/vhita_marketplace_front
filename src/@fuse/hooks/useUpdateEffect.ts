import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		}
		return effect();
	}, deps);
};

export default useUpdateEffect;

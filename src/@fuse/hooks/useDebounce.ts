import _ from '@lodash';
import { DebounceSettingsLeading } from 'lodash';
import { useRef } from 'react';

function useDebounce(func: (T) => void, wait: number | undefined, options?: DebounceSettingsLeading) {
	return useRef(_.debounce(func, wait, options)).current;
}

export default useDebounce;

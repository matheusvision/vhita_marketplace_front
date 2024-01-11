import React from 'react';
import { SlicesType } from 'app/store/lazyWithSlices';
import { Reducer } from '@reduxjs/toolkit';
import generateReducersFromSlices from './generateReducersFromSlices';
import { rootReducer } from './store';

/**
 * Injects reducers grouped by common key.
 */
export const injectReducersGroupedByCommonKey = async (slices: SlicesType) => {
	const reducers = generateReducersFromSlices(slices);

	if (reducers) {
		Object.keys(reducers).forEach((key) => {
			if (!key || reducers[key]) {
				return;
			}
			rootReducer.inject(
				{
					reducerPath: key,
					reducer: reducers[key] as Reducer
				},
				{
					overrideExisting: true
				}
			);
		});
	}

	return true;
};

/**
 * A Higher Order Component that injects reducers for the provided slices.
 */
const withSlices =
	<P extends object>(slices: SlicesType) =>
	(WrappedComponent: React.FC<P>) => {
		injectReducersGroupedByCommonKey(slices);

		return function WithInjectedReducer(props: P) {
			return <WrappedComponent {...props} />;
		};
	};

export default withSlices;

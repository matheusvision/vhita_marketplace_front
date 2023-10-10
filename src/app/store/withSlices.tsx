import React from 'react';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import { injectReducers } from 'app/store';

/**
 * The reducer function for the slice.
 */
type Slice<State = unknown> = {
	reducer: Reducer<State, AnyAction>;

	/**
	 * The name of the slice.
	 */
	name: string;
};

type KnownAction = {
	/**
	 * The type of the action.
	 */
	type: string;

	/**
	 * The payload of the action.
	 */
	payload: unknown;
};

/**
 * Injects reducers grouped by common key.
 */
export const injectReducersGroupedByCommonKey = async (slices: Slice[]) => {
	/**
	 * An object that groups reducers by their common key.
	 */
	const groupedReducers: Record<string, Record<string, Reducer<unknown, KnownAction>>> = {};

	/**
	 * An object that contains all combined reducers.
	 */
	const allCombinedReducers: Record<string, Reducer> = {};

	// Group slices by their common key and prepare for combineReducers
	slices.forEach((slice) => {
		const [commonKey, specificKey] = slice.name.split('/');

		if (!groupedReducers[commonKey]) {
			groupedReducers[commonKey] = {};
		}

		groupedReducers[commonKey][specificKey] = slice.reducer;
	});

	// Now combine reducers for each common key
	Object.entries(groupedReducers).forEach(([commonKey, reducers]) => {
		const combinedReducer = combineReducers(reducers);
		allCombinedReducers[commonKey] = combinedReducer;
	});

	// Inject all reducers at once
	injectReducers(allCombinedReducers);

	return true;
};

/**
 * A Higher Order Component that injects reducers for the provided slices.
 */
const withSlices =
	<P extends object>(slices: Slice[]) =>
	(WrappedComponent: React.FC<P>) => {
		injectReducersGroupedByCommonKey(slices);

		return function WithInjectedReducer(props: P) {
			return <WrappedComponent {...props} />;
		};
	};

export default withSlices;

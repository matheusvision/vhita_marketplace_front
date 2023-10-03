import React from 'react';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import { injectReducers } from 'app/store';

type Slice<State = unknown> = {
	reducer: Reducer<State, AnyAction>;
	name: string;
};

type KnownAction = {
	type: string;
	payload: unknown;
};

export const injectReducersGroupedByCommonKey = async (slices: Slice[]) => {
	const groupedReducers: Record<string, Record<string, Reducer<unknown, KnownAction>>> = {};
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

const withSlices =
	<P extends object>(slices: Slice[]) =>
	(WrappedComponent: React.FC<P>) => {
		injectReducersGroupedByCommonKey(slices);

		return function WithInjectedReducer(props: P) {
			return <WrappedComponent {...props} />;
		};
	};

export default withSlices;

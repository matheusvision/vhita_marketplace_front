import React, { useEffect, useState } from 'react';
import { Reducer, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { injectReducer } from 'app/store/index';
import FuseLoading from '@fuse/core/FuseLoading';

type Slice<State = unknown> = {
	reducer: Reducer<State, AnyAction>;
	name: string;
};

interface DynamicSliceProviderProps {
	slices: Slice | Slice[];
	children: React.ReactNode;
}

const injectReducersGroupedByCommonKey = (slices: Slice[]) => {
	const groupedReducers: Record<string, Record<string, Reducer<unknown, AnyAction>>> = {};

	// Group the slices by their common key and prepare for combineReducers
	slices.forEach((slice) => {
		const [commonKey, specificKey] = slice.name.split('/');

		if (!groupedReducers[commonKey]) {
			groupedReducers[commonKey] = {};
		}

		groupedReducers[commonKey][specificKey] = slice.reducer;
	});

	// Now combine and inject reducers for each common key
	Object.entries(groupedReducers).forEach(([commonKey, reducers]) => {
		const combinedReducer = combineReducers(reducers);
		injectReducer(commonKey, combinedReducer);
	});
};

const DynamicSliceProvider: React.FC<DynamicSliceProviderProps> = ({ slices, children }) => {
	const [isReady, setReady] = useState(false);

	useEffect(() => {
		const sliceArray = Array.isArray(slices) ? slices : [slices];
		injectReducersGroupedByCommonKey(sliceArray);

		setReady(true);
	}, [slices]);

	if (!isReady) {
		return <FuseLoading />;
	}

	return children;
};

export default DynamicSliceProvider;

import React, { ComponentType, lazy } from 'react';
import { AnyAction, Reducer } from '@reduxjs/toolkit';
import withSlices from './withSlices';

type Slice<State = unknown> = {
	/**
	 * The reducer function for the slice.
	 */
	reducer: Reducer<State, AnyAction>;

	/**
	 * The name of the slice.
	 */
	name: string;
};

/**
 * The type of the function that imports a component.
 */
type ImportFunctionType = () => Promise<{ default: ComponentType<unknown> }>;

/**
 * A Higher Order Component that lazily loads a component and injects reducers for the provided slices.
 */
const lazyWithSlices = (importFunction: ImportFunctionType, slices: Slice[]): React.FC => {
	const LazyComponent = lazy(importFunction);
	return withSlices(slices)(LazyComponent);
};

export default lazyWithSlices;

import React, { ComponentType, lazy } from 'react';
import { AnyAction, Reducer } from '@reduxjs/toolkit';
import withSlices from './withSlices';

type Slice<State = unknown> = {
	reducer: Reducer<State, AnyAction>;
	name: string;
};

type ImportFunctionType = () => Promise<{ default: ComponentType<unknown> }>;

const lazyWithSlices = (importFunction: ImportFunctionType, slices: Slice[]): React.FC => {
	const LazyComponent = lazy(importFunction);
	return withSlices(slices)(LazyComponent);
};

export default lazyWithSlices;

import { Action, Reducer, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import store from 'app/store';

/**
 * The type of the dispatch function for this application (AppState).
 */
export type AppDispatchType = typeof store.dispatch;

/**
 * The base type of the root state for this application (AppState).
 */
export type BaseRootStateType = ReturnType<typeof store.getState>;

/**
 * The extended type of the root state for this application (AppState).
 */
type ExtendedRootStateType<T extends string, State> = BaseRootStateType & { [K in T]: State };

/**
 * The type of the async reducers for this application (AppState).
 */
export type AsyncReducersType = {
	[key: string]: Reducer;
};

/**
 * Type to return from async actions (redux-thunk).
 * `R` describes the return value of the thunk.
 * `E` describes the extra argument type given to the action thunk, e.g.
 * `(dispatch, getState, extraArgument) => {}`
 */
export type AppThunkType<R = Promise<void>, E = unknown> = ThunkAction<R, RootStateType, E, Action<string>>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

/**
 * Dispatch function for this application (AppState).
 * `E` describes the extra argument type given to the action thunk, e.g.
 * `(dispatch, getState, extraArgument) => {}`
 */
export type AppThunkDispatchType<E = unknown> = ThunkDispatch<RootStateType, E, Action<string>>;

/**
 * The type of a path to a specific type.
 */
type PathToType<Str extends string, T> = Str extends `${infer Start}/${infer Rest}`
	? { [P in Start as P]: PathToType<Rest, T> }
	: { [P in Str]: T };

/**
 * The type of multiple paths to specific types.
 * _T - The type to return.
 */
type MultiplePathsToType<Slices extends unknown[], _T = unknown> = Slices extends [infer First, ...infer Rest]
	? First extends { name: string; getInitialState: () => unknown }
		? PathToType<First['name'], ReturnType<First['getInitialState']>> & MultiplePathsToType<Rest>
		: Record<string, never>
	: Record<string, never>;

/**
 * The type of the root state for this application (AppState) with a specific slice.
 */
export type RootStateWithSliceType<SliceType extends { name: string; getInitialState: () => unknown }> =
	BaseRootStateType & PathToType<SliceType['name'], ReturnType<SliceType['getInitialState']>>;

export type RootStateType<
	T extends
		| string
		| { name: string; getInitialState: () => unknown }
		| Array<{ name: string; getInitialState: () => unknown }> = null,
	State = never
> = T extends string
	? ExtendedRootStateType<T, State>
	: T extends { name: string; getInitialState: () => unknown }
	? RootStateWithSliceType<T>
	: T extends Array<{ name: string; getInitialState: () => unknown }>
	? BaseRootStateType & MultiplePathsToType<T>
	: BaseRootStateType;

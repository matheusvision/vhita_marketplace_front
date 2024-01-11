import { configureAppStore } from 'app/store/store';
import { AppDispatchType, BaseRootStateType } from 'app/store/types';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureAppStore();

/**
 * Typed hook to get the dispatch function from the Redux store.
 */
export const useAppDispatch: () => AppDispatchType = useDispatch;

/**
 * Typed hook to get a slice of the Redux store state.
 */
export const useAppSelector: TypedUseSelectorHook<ReturnType<BaseRootStateType>> = useSelector;

export default store;

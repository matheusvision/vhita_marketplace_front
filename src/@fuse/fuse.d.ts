import { RouteMatch, RouteObject } from 'react-router/lib/router';

export interface FuseRouteObject extends RouteObject {
	settings?: any;
}

export interface FuseRouteMatch extends RouteMatch {
	route: FuseRouteObject;
}

export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

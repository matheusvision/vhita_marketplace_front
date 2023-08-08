import { createContext } from 'react';
import { RouteObject } from 'react-router/dist/lib/context';
// import { FuseRoutesType } from '@fuse/utils/FuseUtils';

export type AppContextType = {
	routes?: RouteObject[];
	// routes?: FuseRoutesType;
};

const AppContext = createContext<AppContextType>({});

export default AppContext;

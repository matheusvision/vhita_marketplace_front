import { createContext } from 'react';

interface AppContextInterface {
	routes?: [];
}

const AppContext = createContext<AppContextInterface>({});

export default AppContext;

import { createContext } from 'react';
import { routesType } from 'app/configs/routesConfig';

const AppContext = createContext<{
	routes?: routesType;
}>({});

export default AppContext;

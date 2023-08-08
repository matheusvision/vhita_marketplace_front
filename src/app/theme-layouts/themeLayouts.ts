import layout1 from './layout1/Layout1';
import layout2 from './layout2/Layout2';
import layout3 from './layout3/Layout3';

export type themeLayoutsType = {
	[key: string]: React.ComponentType;
};

const themeLayouts: themeLayoutsType = {
	layout1,
	layout2,
	layout3
};

export default themeLayouts;

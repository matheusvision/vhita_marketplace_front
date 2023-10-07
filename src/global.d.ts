/**
 * The module for importing CSS files.
 * @module '*.css'
 * @type {CSSContent}
 */
declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

/**
 * The type definition for the Node.js process object with additional properties.
 * @typedef {NodeJS.Process & { browser: boolean, env: { [key: string]: string | undefined } }} ProcessType
 */
type ProcessType = NodeJS.Process & {
	browser: boolean;
	env: {
		[key: string]: string | undefined;
	};
};

/**
 * The global process object.
 * @type {ProcessType}
 */
declare let process: ProcessType;

/**
 * The type definition for the Hot Module object.
 * @typedef {Object} HotModule
 * @property {Object} hot - The Hot Module Replacement API object.
 * @property {function} hot.status - The function to get the status of the module.
 */
interface HotModule {
	hot?: {
		status: () => string;
	};
}

declare const module: HotModule;

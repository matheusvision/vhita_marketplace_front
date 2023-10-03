declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

type ProcessType = NodeJS.Process & {
	browser: boolean;
	env: {
		[key: string]: string | undefined;
	};
};

declare let process: ProcessType;

interface HotModule {
	hot?: {
		status: () => string;
	};
}

declare const module: HotModule;

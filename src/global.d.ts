declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

type MyProcess = NodeJS.Process & {
	browser: boolean;
	env: {
		[key: string]: string | undefined;
	};
};

declare let process: Process;

interface HotModule {
	hot?: {
		status: () => string;
	};
}

declare const module: HotModule;

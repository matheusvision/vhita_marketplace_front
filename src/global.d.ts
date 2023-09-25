// In a .d.ts file, e.g. src/global.d.ts or src/declarations.d.ts
declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

// In a .d.ts file in your project
interface Process {
	browser: boolean;
	env: {
		[key: string]: string | undefined;
	};
}

// Make it a global variable
declare let process: Process;

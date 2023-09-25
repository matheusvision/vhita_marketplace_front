// Define the AvailableOption type

type AvailableOption = {
	value: string;
	title: string;
};

// Define the Option type
type Option = {
	description: string;
	link: string;
	component?: React.ComponentType<unknown>;
};

export type LayoutOptionType = {
	title: string;
	description: string;
	availableOptions: AvailableOption[];
	selectedOption: string;
	options: {
		[key: string]: Option;
	};
};

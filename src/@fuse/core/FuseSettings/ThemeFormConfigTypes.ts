type RadioOption = {
	name: string;
	value: string;
};

type FormFieldBase = {
	title: string;
};

type RadioField = FormFieldBase & {
	type: 'radio';
	options: RadioOption[];
};

type NumberField = FormFieldBase & {
	type: 'number';
};

type SwitchField = FormFieldBase & {
	type: 'switch';
};

type GroupFieldChildren = {
	[key: string]: RadioField | SwitchField | NumberField | GroupField;
};

type GroupField = FormFieldBase & {
	type: 'group';
	children: GroupFieldChildren;
};

type AnyFormField = RadioField | SwitchField | NumberField | GroupField;

type ThemeFormConfigTypes = {
	[key: string]: AnyFormField;
};

export default ThemeFormConfigTypes;

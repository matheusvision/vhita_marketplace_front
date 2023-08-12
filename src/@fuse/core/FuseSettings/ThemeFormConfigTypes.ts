type RadioOptionType = {
	name: string;
	value: string;
};

type FormFieldBaseType = {
	title: string;
};

type RadioFieldType = FormFieldBaseType & {
	type: 'radio';
	options: RadioOptionType[];
};

type NumberFieldType = FormFieldBaseType & {
	type: 'number';
};

type SwitchFieldType = FormFieldBaseType & {
	type: 'switch';
};

type GroupFieldChildrenType = {
	[key: string]: RadioFieldType | SwitchFieldType | NumberFieldType | GroupFieldType;
};

type GroupFieldType = FormFieldBaseType & {
	type: 'group';
	children: GroupFieldChildrenType;
};

type AnyFormFieldType = RadioFieldType | SwitchFieldType | NumberFieldType | GroupFieldType;

type ThemeFormConfigTypes = {
	[key: string]: AnyFormFieldType;
};

export default ThemeFormConfigTypes;

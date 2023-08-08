interface RadioOption {
	name: string;
	value: string;
}

interface FormFieldBase {
	title: string;
}

interface RadioField extends FormFieldBase {
	type: 'radio';
	options: RadioOption[];
}

interface NumberField extends FormFieldBase {
	type: 'number';
}

interface SwitchField extends FormFieldBase {
	type: 'switch';
}

interface GroupFieldChildren {
	[key: string]: RadioField | SwitchField | NumberField | GroupField;
}

interface GroupField extends FormFieldBase {
	type: 'group';
	children: GroupFieldChildren;
}

type AnyFormField = RadioField | SwitchField | NumberField | GroupField;

interface ThemeFormConfigTypes {
	[key: string]: AnyFormField;
}

export default ThemeFormConfigTypes;

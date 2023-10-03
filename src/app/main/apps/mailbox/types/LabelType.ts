import { LabelColorsType } from '../mail/labelColors';

export type LabelType = {
	id: string;
	title: string;
	slug: string;
	color: LabelColorsType;
};

export type LabelsType = LabelType[];

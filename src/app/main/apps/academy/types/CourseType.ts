type StepType = {
	id: string;
	title: string;
	subtitle: string;
	content: string;
	order: number;
};

type CourseType = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	duration: number;
	activeStep: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	steps: StepType[];
	progress: {
		currentStep: number;
		completed: number;
	};
};

export default CourseType;

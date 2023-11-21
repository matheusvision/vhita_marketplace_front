import apiService from 'app/store/apiService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { PartialDeep } from 'type-fest';

export const addTagTypes = ['academy_courses', 'academy_course', 'academy_categories'] as const;

const AcademyApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCourses: build.query<GetCoursesApiResponse, GetCoursesApiArg>({
				query: () => ({ url: `/mock-api/academy/courses` }),
				providesTags: ['academy_courses']
			}),
			getCourse: build.query<GetCourseApiResponse, GetCourseApiArg>({
				query: (queryArg) => ({ url: `/mock-api/academy/courses/${queryArg.courseId}` }),
				providesTags: ['academy_course']
			}),
			updateCourse: build.mutation<UpdateCourseApiResponse, UpdateCourseApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'PUT',
					data: queryArg.data
				}),
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(showMessage({ message: 'Course Saved' }));
					} catch (err) {
						dispatch(showMessage({ message: 'Error Saving the course!' }));
					}
				},
				invalidatesTags: ['academy_course']
			}),
			deleteCourse: build.mutation<DeleteCourseApiResponse, DeleteCourseApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'DELETE'
				})
			}),
			getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>({
				query: () => ({ url: `/mock-api/academy/categories` }),
				providesTags: ['academy_categories']
			})
		}),
		overrideExisting: false
	});

export { AcademyApi as exampleApi };
export type GetCoursesApiResponse = /** status 200 OK */ Course[];
export type GetCoursesApiArg = void;
export type GetCourseApiResponse = /** status 200 OK */ Course;
export type GetCourseApiArg = {
	courseId: string;
};

export type UpdateCourseApiResponse = unknown;
export type UpdateCourseApiArg = {
	courseId: string;
	data: PartialDeep<Course>;
};

export type DeleteCourseApiResponse = unknown;
export type DeleteCourseApiArg = {
	courseId: string;
};

export type GetCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetCategoriesApiArg = void;
export type Course = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	duration: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	progress: {
		currentStep: number;
		completed: number;
	};
	activeStep?: number;
	steps?: {
		content?: string;
		title?: string;
		subtitle?: string;
		order?: number;
	}[];
};

export type Category = {
	id: string;
	title: string;
	slug: string;
	color: string;
};

export const {
	useGetCoursesQuery,
	useGetCourseQuery,
	useUpdateCourseMutation,
	useDeleteCourseMutation,
	useGetCategoriesQuery,
	useLazyGetCoursesQuery
} = AcademyApi;

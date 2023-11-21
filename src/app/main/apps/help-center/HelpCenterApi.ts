import { createSelector } from '@reduxjs/toolkit';
import apiService from 'app/store/apiService';
import _ from '@lodash';
import { RootStateType } from 'app/store/types';

export const addTagTypes = [
	'help_center_guides',
	'help_center_guides_by_category',
	'help_center_guide',
	'help_center_guide_categories',
	'help_center_faqs',
	'help_center_faqs_by_category',
	'help_center_most_asked_faqs',
	'help_center_faq_categories'
] as const;

const HelpCenterApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getGuides: build.query<GetGuidesApiResponse, GetGuidesApiArg>({
				query: () => ({ url: `/mock-api/help-center/guides` }),
				providesTags: ['help_center_guides']
			}),
			getGuidesByCategorySlug: build.query<GetGuidesByCategorySlugApiResponse, GetGuidesByCategorySlugApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/guides/${queryArg.categorySlug}`
				}),
				providesTags: ['help_center_guides_by_category']
			}),
			getGuideByCategoryGuideSlug: build.query<
				GetGuideByCategoryGuideSlugApiResponse,
				GetGuideByCategoryGuideSlugApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/guides/${queryArg.categorySlug}/${queryArg.guideSlug}`
				}),
				providesTags: ['help_center_guide']
			}),
			getGuideCategories: build.query<GetGuideCategoriesApiResponse, GetGuideCategoriesApiArg>({
				query: () => ({ url: `/mock-api/help-center/guides/categories` }),
				providesTags: ['help_center_guide_categories']
			}),
			getFaqs: build.query<GetFaqsApiResponse, GetFaqsApiArg>({
				query: () => ({ url: `/mock-api/help-center/faqs` }),
				providesTags: ['help_center_faqs']
			}),
			getFaqsByCategorySlug: build.query<GetFaqsByCategorySlugApiResponse, GetFaqsByCategorySlugApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/faqs/${queryArg.categorySlug}`
				}),
				providesTags: ['help_center_faqs_by_category']
			}),
			getMostlyFaqs: build.query<GetMostlyFaqsApiResponse, GetMostlyFaqsApiArg>({
				query: () => ({ url: `/mock-api/help-center/faqs/most-asked` }),
				providesTags: ['help_center_most_asked_faqs']
			}),
			getFaqCategories: build.query<GetFaqCategoriesApiResponse, GetFaqCategoriesApiArg>({
				query: () => ({ url: `/mock-api/help-center/faqs/categories` }),
				providesTags: ['help_center_faq_categories']
			})
		}),
		overrideExisting: false
	});
export { HelpCenterApi };
export type GetGuidesApiResponse = /** status 200 OK */ Guide[];
export type GetGuidesApiArg = void;
export type GetGuidesByCategorySlugApiResponse = /** status 200 OK */ Guide[];
export type GetGuidesByCategorySlugApiArg = {
	/** category slug */
	categorySlug: string;
};
export type GetGuideByCategoryGuideSlugApiResponse = /** status 200 OK */ Guide;
export type GetGuideByCategoryGuideSlugApiArg = {
	/** category slug */
	categorySlug: string;
	/** guide slug */
	guideSlug: string;
};
export type GetGuideCategoriesApiResponse = /** status 200 OK */ GuideCategory[];
export type GetGuideCategoriesApiArg = void;
export type GetFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetFaqsApiArg = void;
export type GetFaqsByCategorySlugApiResponse = /** status 200 OK */ Faq[];
export type GetFaqsByCategorySlugApiArg = {
	/** category slug */
	categorySlug: string;
};
export type GetMostlyFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetMostlyFaqsApiArg = void;
export type GetFaqCategoriesApiResponse = /** status 200 OK */ FaqCategory[];
export type GetFaqCategoriesApiArg = void;
export type Guide = {
	id: string;
	categoryId: string;
	slug: string;
	title: string;
	subtitle: string;
	content: string;
};
export type GuideCategory = {
	id: string;
	slug: string;
	title: string;
};
export type Faq = {
	id: string;
	categoryId: string;
	question: string;
	answer: string;
};
export type FaqCategory = {
	id: string;
	slug: string;
	title: string;
};
export const {
	useGetGuidesQuery,
	useGetGuidesByCategorySlugQuery,
	useGetGuideByCategoryGuideSlugQuery,
	useGetGuideCategoriesQuery,
	useGetFaqsQuery,
	useGetFaqsByCategorySlugQuery,
	useGetMostlyFaqsQuery,
	useGetFaqCategoriesQuery
} = HelpCenterApi;

export const selectGroupedFaqs = createSelector(
	// Input selectors
	[
		(state: RootStateType) => HelpCenterApi.endpoints.getFaqs.select()(state)?.data || [],
		(state: RootStateType) => HelpCenterApi.endpoints.getFaqCategories.select()(state)?.data || []
	],

	// Transform function
	(faqs, categories) => {
		return categories.map((category) => ({
			...category,
			faqs: faqs.filter((faq) => faq.categoryId === category.id)
		}));
	}
);

export const selectGroupedGuides = createSelector(
	[
		(state: RootStateType) => HelpCenterApi.endpoints.getGuides.select()(state)?.data || [],
		(state: RootStateType) => HelpCenterApi.endpoints.getGuideCategories.select()(state)?.data || []
	],
	(guides, categories) => {
		return categories.map((category) => ({
			...category,
			guides: _.filter(guides, { categoryId: category.id })
		}));
	}
);

export const selectGuideCategoryBySlug = (slug: GuideCategory['slug']) =>
	createSelector(
		[(state: RootStateType) => HelpCenterApi.endpoints.getGuideCategories.select()(state)?.data || []],
		(categories) => {
			return _.find(categories, { slug });
		}
	);

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
			getHelpCenterGuides: build.query<GetHelpCenterGuidesApiResponse, GetHelpCenterGuidesApiArg>({
				query: () => ({ url: `/mock-api/help-center/guides` }),
				providesTags: ['help_center_guides']
			}),
			getHelpCenterGuidesByCategorySlug: build.query<
				GetHelpCenterGuidesByCategorySlugApiResponse,
				GetHelpCenterGuidesByCategorySlugApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/guides/${queryArg.categorySlug}`
				}),
				providesTags: ['help_center_guides_by_category']
			}),
			getHelpCenterGuideByCategoryGuideSlug: build.query<
				GetHelpCenterGuideByCategoryGuideSlugApiResponse,
				GetHelpCenterGuideByCategoryGuideSlugApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/guides/${queryArg.categorySlug}/${queryArg.guideSlug}`
				}),
				providesTags: ['help_center_guide']
			}),
			getHelpCenterGuideCategories: build.query<
				GetHelpCenterGuideCategoriesApiResponse,
				GetHelpCenterGuideCategoriesApiArg
			>({
				query: () => ({ url: `/mock-api/help-center/guides/categories` }),
				providesTags: ['help_center_guide_categories']
			}),
			getHelpCenterFaqs: build.query<GetHelpCenterFaqsApiResponse, GetHelpCenterFaqsApiArg>({
				query: () => ({ url: `/mock-api/help-center/faqs` }),
				providesTags: ['help_center_faqs']
			}),
			getHelpCenterFaqsByCategorySlug: build.query<
				GetHelpCenterFaqsByCategorySlugApiResponse,
				GetHelpCenterFaqsByCategorySlugApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/help-center/faqs/${queryArg.categorySlug}`
				}),
				providesTags: ['help_center_faqs_by_category']
			}),
			getHelpCenterMostlyFaqs: build.query<GetMostlyFaqsApiResponse, GetMostlyFaqsApiArg>({
				query: () => ({ url: `/mock-api/help-center/faqs/most-asked` }),
				providesTags: ['help_center_most_asked_faqs']
			}),
			getHelpCenterFaqCategories: build.query<
				GetHelpCenterFaqCategoriesApiResponse,
				GetHelpCenterFaqCategoriesApiArg
			>({
				query: () => ({ url: `/mock-api/help-center/faqs/categories` }),
				providesTags: ['help_center_faq_categories']
			})
		}),
		overrideExisting: false
	});
export { HelpCenterApi };

export type GetHelpCenterGuidesApiResponse = /** status 200 OK */ Guide[];
export type GetHelpCenterGuidesApiArg = void;

export type GetHelpCenterGuidesByCategorySlugApiResponse = /** status 200 OK */ Guide[];
export type GetHelpCenterGuidesByCategorySlugApiArg = {
	/** category slug */
	categorySlug: string;
};

export type GetHelpCenterGuideByCategoryGuideSlugApiResponse = /** status 200 OK */ Guide;
export type GetHelpCenterGuideByCategoryGuideSlugApiArg = {
	/** category slug */
	categorySlug: string;
	/** guide slug */
	guideSlug: string;
};

export type GetHelpCenterGuideCategoriesApiResponse = /** status 200 OK */ GuideCategory[];
export type GetHelpCenterGuideCategoriesApiArg = void;

export type GetHelpCenterFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetHelpCenterFaqsApiArg = void;

export type GetHelpCenterFaqsByCategorySlugApiResponse = /** status 200 OK */ Faq[];
export type GetHelpCenterFaqsByCategorySlugApiArg = {
	/** category slug */
	categorySlug: string;
};

export type GetMostlyFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetMostlyFaqsApiArg = void;

export type GetHelpCenterFaqCategoriesApiResponse = /** status 200 OK */ FaqCategory[];
export type GetHelpCenterFaqCategoriesApiArg = void;

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
	useGetHelpCenterGuidesQuery,
	useGetHelpCenterGuidesByCategorySlugQuery,
	useGetHelpCenterGuideByCategoryGuideSlugQuery,
	useGetHelpCenterGuideCategoriesQuery,
	useGetHelpCenterFaqsQuery,
	useGetHelpCenterFaqsByCategorySlugQuery,
	useGetHelpCenterMostlyFaqsQuery,
	useGetHelpCenterFaqCategoriesQuery
} = HelpCenterApi;

export const selectGroupedFaqs = createSelector(
	// Input selectors
	[
		(state: RootStateType) => HelpCenterApi.endpoints.getHelpCenterFaqs.select()(state)?.data || [],
		(state: RootStateType) => HelpCenterApi.endpoints.getHelpCenterFaqCategories.select()(state)?.data || []
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
		(state: RootStateType) => HelpCenterApi.endpoints.getHelpCenterGuides.select()(state)?.data || [],
		(state: RootStateType) => HelpCenterApi.endpoints.getHelpCenterGuideCategories.select()(state)?.data || []
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
		[(state: RootStateType) => HelpCenterApi.endpoints.getHelpCenterGuideCategories.select()(state)?.data || []],
		(categories) => {
			return _.find(categories, { slug });
		}
	);

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, globalHeaders } from '@/utils/apiFetch';

const baseQuery = async (args, api, extraOptions) => {
	const result = await fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			Object.entries(globalHeaders).forEach(([key, value]) => {
				headers.set(key, value);
			});
			return headers;
		}
	})(args, api, extraOptions);

	// Example of handling specific error codes
	if (result.error && result.error.status === 401) {
		// Logic to handle 401 errors (e.g., refresh token)
	}

	return result;
};

export const apiService = createApi({
	baseQuery,
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;

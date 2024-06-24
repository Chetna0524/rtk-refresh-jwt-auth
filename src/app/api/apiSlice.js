import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("auth-token", token);
		}
		return headers;
	},
	credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	// console.log(args) // request url, method, body
	// console.log(api) // signal, dispatch, getState()
	// console.log(extraOptions) //custom like {shout: true}

	let result = await baseQuery(args, api, extraOptions);
	console.log("result", result);
	// If you want, handle other status codes, too
	if (result?.error?.originalStatus === 401) {
		console.log("sending refresh token");

		// send refresh token to get new access token
		const refreshResult = await baseQuery(
			{ method: "POST", url: "refresh" },
			api,
			extraOptions
		);

		console.log("refresj", refreshResult);

		if (refreshResult?.data) {
			// store the new token
			api.dispatch(setCredentials({ Token: refreshResult.data.token }));

			console.log(refreshResult);

			// retry original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error?.status === 401) {
				refreshResult.error.data.message = "Your login has expired. ";
			}
			return refreshResult;
		}
	}

	return result;
};

const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Post"],
	endpoints: () => ({}),
});

export default apiSlice;

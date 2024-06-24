import apiSlice from "../../app/api/apiSlice";

const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		newUser: builder.mutation({
			query: (user) => ({
				url: "api/user/register",
				method: "POST",
				body: { ...user },
			}),
		}),
	}),
});

export const { useLoginMutation, useNewUserMutation } = userSlice;

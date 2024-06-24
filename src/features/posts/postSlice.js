import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import apiSlice from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({
	selectId: (post) => post._id,
});

const initialState = postsAdapter.getInitialState();

export const postSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
			transformResponse: (response) => {
				return postsAdapter.setAll(initialState, response);
			},
			providesTags: (result, error, arg) => [
				{ type: "Post", id: "LIST" },
				...result.ids.map((id) => ({ type: "Post", id })),
			],
		}),
		addPost: builder.mutation({
			query: (post) => ({
				url: "/posts",
				method: "POST",
				body: post,
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
		updatePost: builder.mutation({
			query: (post) => ({
				url: `/posts/${post._id}`,
				method: "PATCH",
				body: post,
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
		deletePost: builder.mutation({
			query: ({ postId }) => ({
				url: `posts/${postId}`,
				method: "DELETE",
				body: postId,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useAddPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postSlice;

const selectPostsResult = postSlice.endpoints.getPosts.select();

export const selectPostsData = createSelector(
	selectPostsResult,
	(postsData) => postsData.data
);

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostsIds,
} = postsAdapter.getSelectors(
	(state) => selectPostsData(state) ?? initialState
);

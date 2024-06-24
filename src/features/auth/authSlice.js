import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null },
	reducers: {
		setCredentials: (state, action) => {
			const { results, Token } = action.payload;
			state.user = results;
			state.token = Token;
		},
		logout: (state, action) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;

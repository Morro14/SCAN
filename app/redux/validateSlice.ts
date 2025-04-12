import { createSlice } from "@reduxjs/toolkit";

const validateSlice = createSlice({
	name: "validate",
	initialState: { login: true, password: true },
	reducers: {
		setValid: (state, action) => {
			let newState = { login: true, password: true };
			if (action.payload.name === "login") {
				newState = {
					...state,
					login: action.payload.valid,
				};
			}
			if (action.payload.name === "password") {
				newState = {
					...state,

					password: action.payload.valid,
				};
			}

			return newState;
		},
	},
});

export const { setValid } = validateSlice.actions;

export default validateSlice.reducer;

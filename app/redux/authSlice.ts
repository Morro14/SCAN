import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: 'none',
        token: 'none',
    },
    reducers: {
        authReducer: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username
        }
    }
})

export const { authReducer } = authSlice.actions

export default authSlice.reducer
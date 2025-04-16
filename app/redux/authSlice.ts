import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        token: null,
        expire: null
    },
    reducers: {
        authReducer: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username
            state.expire = action.payload.expire
        }
    }
})

export const { authReducer } = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        userData: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.userData = JSON.stringify(action.payload.userData);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userData = null;
        },
        getUserData(state) {
            return state.auth.userData;
        }
    }
})


export const { login, logout, getUserData } = authSlice.actions;

export default authSlice.reducer;
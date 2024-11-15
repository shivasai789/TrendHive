import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isAuthenticated: false,
    isLoading: true ,
    user: null
}

export const registerUserAction = createAsyncThunk('/auth/register',
    async(formData) => {
        const response = await axios.post('http://localhost:9000/api/auth/register',formData,{
            withCredentials: true
        })

        return response.data;
    }
)

export const loginUserAction = createAsyncThunk('/auth/login',
    async(formData) => {
        const response = await axios.post('http://localhost:9000/api/auth/login',formData,{
            withCredentials: true
        })

        return response.data;
    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async() => {
        const response = await axios.get('http://localhost:9000/api/auth/check-auth',{
            withCredentials: true,
            headers: {
                'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate',
            }
        })

        return response.data;
    }
)

export const logoutUserAction = createAsyncThunk('/auth/logout',
    async() => {
        const response = await axios.post('http://localhost:9000/api/auth/logout',{},{
            withCredentials: true
        })

        return response.data;
    }
)




const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers : {
        // eslint-disable-next-line no-unused-vars
        setUser: (state,action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAction.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUserAction.fulfilled, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUserAction.rejected, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(loginUserAction.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUserAction.fulfilled, (state,action) => {
            console.log(action)
            state.isLoading = false
            state.user = !action.payload.success ? null : action.payload.user
            state.isAuthenticated = action.payload.success
        }).addCase(loginUserAction.rejected, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state,action) => {
            console.log(action)
            state.isLoading = false
            state.user = !action.payload.success ? null : action.payload.user
            state.isAuthenticated = action.payload.success
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(logoutUserAction.fulfilled, (state) => {
            state.isLoading = false
            state.user = null;
            state.isAuthenticated = false
        })
    }
})


export const {setUser} = authSlice.actions
export default authSlice.reducer;
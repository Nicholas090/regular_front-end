import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from '../../axios';

export const login = createAsyncThunk('fetchAuth', async (params) => {
    const { data } = await axios.post('/login', params);
    return data;
});

export const register = createAsyncThunk('fetchRegister', async (params) => {
    const { data } = await axios.post('/register', params);
    return data;
});


export enum userRole {
    admin = 'admin',
    user = 'user',
}

interface IInitialState {
    id: string;
    email: string;
    password: string;
    name: string;
    nickname: string;
    role: userRole;
}

const initialState: { data: IInitialState | null, status: string  } = {
    data: null,
    status: 'loading',
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [login.fulfilled.type]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [login.rejected.type]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [register.pending.type]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [register.fulfilled.type]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [register.rejected.type]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});


export const usersReducer = usersSlice.reducer;

export const { logout } = usersSlice.actions;

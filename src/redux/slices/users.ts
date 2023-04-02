import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';


export interface RegistrationBody {
    email: string;
    password: string;
    nickname: string;
    name: string;
}

export interface LoginBody {
    email: string;
    password: string;
    nickname?: string;
}


export const login = createAsyncThunk('fetchAuth', async (params: LoginBody) => {
    const { data } = await axios.post('/login', params);
    return data;
});

export const register = createAsyncThunk('fetchRegister', async (params: RegistrationBody) => {
    const { data } = await axios.post('/registration', params);
    return data;
});


export enum userRole {
    admin = 'admin',
    user = 'user',
}

export interface IInitialState {
    id: string;
    email: string;
    password: string;
    name: string;
    nickname: string;
    role: userRole;
}

const initialState: { data: { user: IInitialState, accessToken: string, refreshToken: string } | null, status: string  } = {
    data: null,
    status: 'loading',
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
        setData: (state,  payload) => {
            state.data = payload.payload;
            state.status = 'loaded';
        }
    },
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

export const { logout, setData } = usersSlice.actions;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';


export interface CreatePostBody {
    title: string;
    content?: string;
    imageUrl: string;
    authorId: number;
}

export interface GetPostsBody {
    page: number;
    perPage: number;
}

export interface UpdatePostByIdBody {
    id: number;
    title?: string;
    content?: string;
    imageUrl?: string;
}

export interface DeletePostBody {
    id: number;
}

//
// export const create = createAsyncThunk('fetchAuth', async (params: LoginBody) => {
//     const { data } = await axios.post('/login', params);
//     return data;
// });
//
// export const getById = createAsyncThunk('fetchAuth', async (params: LoginBody) => {
//     const { data } = await axios.post('/login', params);
//     return data;
// });
//
// export const getWithPagination = createAsyncThunk('fetchAuth', async (params: LoginBody) => {
//     const { data } = await axios.post('/login', params);
//     return data;
// });
//
// export const update = createAsyncThunk('fetchAuth', async (params: LoginBody) => {
//     const { data } = await axios.post('/login', params);
//     return data;
// });
//
// export const delete= createAsyncThunk('fetchAuth', async (params: LoginBody) => {
//     const { data } = await axios.post('/login', params);
//     return data;
// });
//
//
// export enum userRole {
//     admin = 'admin',
//     user = 'user',
// }
//
// export interface IInitialState {
//     id: string;
//     email: string;
//     password: string;
//     name: string;
//     nickname: string;
//     role: userRole;
// }
//
// const initialState: { data: { user: IInitialState, accessToken: string, refreshToken: string } | null, status: string  } = {
//     data: null,
//     status: 'loading',
// };

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.data = null;
//         },    },
//     extraReducers: {
//         [login.pending.type]: (state) => {
//             state.status = 'loading';
//             state.data = null;
//         },
//         [login.fulfilled.type]: (state, action) => {
//             state.status = 'loaded';
//             state.data = action.payload;
//         },
//         [login.rejected.type]: (state) => {
//             state.status = 'error';
//             state.data = null;
//         },
//         [register.pending.type]: (state) => {
//             state.status = 'loading';
//             state.data = null;
//         },
//         [register.fulfilled.type]: (state, action) => {
//             state.status = 'loaded';
//             state.data = action.payload;
//         },
//         [register.rejected.type]: (state) => {
//             state.status = 'error';
//             state.data = null;
//         },
//     },
// });
//
//
// export const usersReducer = usersSlice.reducer;
//
// export const { logout } = usersSlice.actions;

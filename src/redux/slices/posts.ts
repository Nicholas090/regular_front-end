import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export interface CreatePostBody {
    title: string;
    content: string;
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


export const createPost = createAsyncThunk('createPost', async (params: CreatePostBody) => {
    const { data } = await axios.post('/create', params);
    return data;
});

export const getPostById = createAsyncThunk('getByIdPost', async (id: number) => {
    const { data } = await axios.post(`/getById/${id}`);
    return data;
});

export const getPostsWithPagination = createAsyncThunk('getWithPaginationPosts', async (params: GetPostsBody) => {
    const { data } = await axios.post('/getPosts', params);
    return data;
});

export const updatePost = createAsyncThunk('updatePost', async (params: UpdatePostByIdBody) => {
    const { data } = await axios.post('/update', params);
    return data;
});

export const deletePost= createAsyncThunk('deletePost', async (params: DeletePostBody) => {
    const { data } = await axios.post('/delete', params);
    return data;
});



export interface IInitialPostState {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
}

const initialState: { posts: IInitialPostState[] | null, currentPost: IInitialPostState | null, status: string  } = {
    posts: null,
    currentPost: null,
    status: 'loading',
};

const postsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.posts = null;
        },    },
    extraReducers: {
        [createPost.pending.type]: (state) => {
            state.status = 'loading';
        },
        [createPost.rejected.type]: (state) => {
            state.status = 'error';
            state.posts = null;
        },
        [getPostById.pending.type]: (state) => {
            state.status = 'loading';
            state.currentPost = null;
        },
        [getPostById.fulfilled.type]: (state, action) => {
            state.status = 'loaded';
            state.currentPost = action.payload;
        },
        [getPostById.rejected.type]: (state) => {
            state.status = 'error';
            state.currentPost = null;
        },
        [getPostsWithPagination.pending.type]: (state) => {
            state.status = 'loading';
            state.posts = null;
        },
        [getPostsWithPagination.fulfilled.type]: (state, action) => {
            state.status = 'loaded';
            state.posts = action.payload;
        },
        [getPostsWithPagination.rejected.type]: (state) => {
            state.status = 'error';
            state.posts = null;
        },
    },
});


export const postsReducer = postsSlice.reducer;

export const {  } = postsSlice.actions;

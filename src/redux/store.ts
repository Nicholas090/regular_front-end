import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from "./slices/users";
import { postsReducer } from "./slices/posts";

export const storeRedux = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
    }
});

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from "./slices/users";

export const storeRedux = configureStore({
    reducer: {
        users: usersReducer,
    }
});

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch;

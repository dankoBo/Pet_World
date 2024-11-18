import { configureStore } from '@reduxjs/toolkit';
import userUpdateSlice from './userUpdateSlice';

const store = configureStore({
    reducer: {
        user: userUpdateSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

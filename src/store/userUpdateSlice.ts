import { createSlice } from '@reduxjs/toolkit';

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        isUpdating: false,
    },
    reducers: {
        startUpdateInfo(state) {
            state.isUpdating = true;
        },
        stopUpdateInfo(state) {
            state.isUpdating = false;
        },
    },
});

export const { startUpdateInfo, stopUpdateInfo } = userUpdateSlice.actions;
export default userUpdateSlice;

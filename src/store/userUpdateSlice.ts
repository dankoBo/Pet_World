import { createSlice } from '@reduxjs/toolkit';

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        isUpdating: false,
        userInfo: {
            firstName: '',
            lastName: '',
            location: '',
            phone: ''
        },
    },
    reducers: {
        startUpdateInfo(state) {
            state.isUpdating = true;
        },
        stopUpdateInfo(state) {
            state.isUpdating = false;
        },
        updateUserData(state, action) {
            state.userInfo = { ...state.userInfo, ...action.payload };
            console.log(state.userInfo);
        }
    },
});

export const { startUpdateInfo, stopUpdateInfo, updateUserData } = userUpdateSlice.actions;
export default userUpdateSlice;

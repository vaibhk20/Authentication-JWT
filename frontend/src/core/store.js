import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './features/userSclice';

export const store = configureStore({
    reducer:{
        userDetails: userDetailsReducer,
    },
});